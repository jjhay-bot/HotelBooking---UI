import { ApolloClient, ApolloLink, InMemoryCache, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { onError as onErrorAlert, onSuccess } from "@gql/uiActions";
import { httpLink } from "@gql/config";
import { loadingVar } from "@gql/reactiveVar";

export const cache = new InMemoryCache({});

const promiseToObservable = (promise) =>
  new Observable((subscriber) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => subscriber.error(err),
    );
    return subscriber;
  });

// Remove all sessionStorage usage, rely on cookies and context for auth
const authLink = setContext((_, { headers }) => {
  // No manual token attachment needed
  return { headers };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      onErrorAlert(err?.message);
      if (err.message === "You are not permitted to do this action") {
        return;
      }
      if (err.message === "Invalid access token") {
        return promiseToObservable(handleRefreshToken()).flatMap(() =>
          forward(operation),
        );
      }
    }
  }

  if (networkError) {
    // Reset loading state on network errors
    loadingVar(false);

    // Show network error details in web UI
    const errorMessage = `Network Error: ${networkError.message || 'Unknown network error'}`;
    const errorDetails = `Status: ${networkError.statusCode || 'N/A'}, Operation: ${operation.operationName || 'Unknown'}`;

    onErrorAlert(`${errorMessage} - ${errorDetails}`);

    console.error(`[Network error]: ${networkError}`);
  }
});

const loggingLink = new ApolloLink((operation, forward) => {
  loadingVar(true);
  // console.log(`[Apollo] Starting request for ${operation.operationName}`);

  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: (result) => {
        // console.log(`[Apollo] Finished request for ${operation.operationName}`);
        loadingVar(false);
        observer.next(result);
      },
      error: (error) => {
        // Ensure loading state is reset even on errors
        loadingVar(false);
        observer.error(error);
      },
      complete: () => {
        loadingVar(false);
        observer.complete();
      }
    });

    return () => subscription.unsubscribe();
  });
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, loggingLink, httpLink]),
  cache: cache,
});
