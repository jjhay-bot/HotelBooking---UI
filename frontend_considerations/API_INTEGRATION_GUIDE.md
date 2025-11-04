# API Integration Guidelines

## GraphQL vs REST Decision Matrix

| Use GraphQL When | Use REST When |
|------------------|---------------|
| Complex data relationships | Simple CRUD operations |
| Multiple data sources needed | Single endpoint operations |
| Real-time updates required | File uploads/downloads |
| Type safety is critical | Caching is straightforward |
| Existing Apollo setup | Third-party API integration |

## GraphQL Implementation

### Query Structure

```javascript
// src/gql/queries/featureQueries.js
import { gql } from '@apollo/client';

export const GET_FEATURE_DATA = gql`
  query GetFeatureData($id: ID!) {
    feature(id: $id) {
      id
      name
      status
      # Include all fields you need
    }
  }
`;

export const GET_FEATURES_LIST = gql`
  query GetFeaturesList($filters: FeatureFilters) {
    features(filters: $filters) {
      id
      name
      status
    }
  }
`;
```

### Mutation Structure

```javascript
export const CREATE_FEATURE = gql`
  mutation CreateFeature($input: FeatureInput!) {
    createFeature(input: $input) {
      id
      name
      status
    }
  }
`;

export const UPDATE_FEATURE = gql`
  mutation UpdateFeature($id: ID!, $input: FeatureUpdateInput!) {
    updateFeature(id: $id, input: $input) {
      id
      name
      status
    }
  }
`;
```

### Error Handling

```javascript
import { useQuery, useMutation } from '@apollo/client';
import { onError } from '@/gql/uiActions';

export function useFeatureData(id) {
  const { data, loading, error, refetch } = useQuery(GET_FEATURE_DATA, {
    variables: { id },
    errorPolicy: 'all',
    onError: (error) => {
      console.error('GraphQL Error:', error);
      onError('Failed to load feature data');
    },
  });

  return {
    feature: data?.feature,
    loading,
    error,
    refetch,
  };
}
```

## REST API Implementation

### Using fetchWithRefresh

```javascript
// src/utils/api/featureAPI.js
import { fetchWithRefresh } from '@/utils/fetchWithRefresh';
import env from '@/constants/env';

export const featureAPI = {
  getFeature: async (id) => {
    const response = await fetchWithRefresh(`${env.API_URI}/api/v1/features/${id}`);
    return response.json();
  },

  createFeature: async (data) => {
    const response = await fetchWithRefresh(`${env.API_URI}/api/v1/features`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  updateFeature: async (id, data) => {
    const response = await fetchWithRefresh(`${env.API_URI}/api/v1/features/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  deleteFeature: async (id) => {
    const response = await fetchWithRefresh(`${env.API_URI}/api/v1/features/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  },
};
```

### Custom Hook for REST API

```javascript
// src/hooks/useFeatureAPI.js
import { useState, useEffect } from 'react';
import { featureAPI } from '@/utils/api/featureAPI';
import { onError } from '@/gql/uiActions';

export function useFeatureAPI(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeature = async () => {
    try {
      setLoading(true);
      const feature = await featureAPI.getFeature(id);
      setData(feature);
      setError(null);
    } catch (err) {
      setError(err.message);
      onError('Failed to load feature');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFeature();
    }
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: fetchFeature,
  };
}
```

## Authentication Patterns

### Checking Authentication Status

```javascript
import { useAuth } from '@/hooks/useAuth';

function FeatureComponent() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSkeleton />;
  if (!user) return <LoginPrompt />;

  return <FeatureContent />;
}
```

### Handling Authentication Errors

```javascript
// In your API calls
const response = await fetchWithRefresh('/api/protected-endpoint');

if (response.status === 401) {
  // Token refresh will be handled automatically
  // by fetchWithRefresh utility
}
```

## Caching Strategies

### Apollo Cache Updates

```javascript
const [createFeature] = useMutation(CREATE_FEATURE, {
  update(cache, { data: { createFeature } }) {
    // Update the list cache
    const existingFeatures = cache.readQuery({ query: GET_FEATURES_LIST });
    cache.writeQuery({
      query: GET_FEATURES_LIST,
      data: {
        features: [...existingFeatures.features, createFeature],
      },
    });
  },
});
```

### Manual Cache Invalidation

```javascript
// Force refetch after mutation
const [updateFeature] = useMutation(UPDATE_FEATURE, {
  refetchQueries: [{ query: GET_FEATURES_LIST }],
  awaitRefetchQueries: true,
});
```

## Real-time Updates

### Apollo Subscriptions

```javascript
import { useSubscription } from '@apollo/client';

const FEATURE_SUBSCRIPTION = gql`
  subscription OnFeatureUpdated($id: ID!) {
    featureUpdated(id: $id) {
      id
      name
      status
      updatedAt
    }
  }
`;

export function useFeatureSubscription(id) {
  const { data } = useSubscription(FEATURE_SUBSCRIPTION, {
    variables: { id },
  });

  return data?.featureUpdated;
}
```

## Error Recovery Patterns

### Retry Logic

```javascript
import { useCallback, useState } from 'react';

export function useRetryableQuery(queryFunction, maxRetries = 3) {
  const [retryCount, setRetryCount] = useState(0);

  const executeWithRetry = useCallback(async (...args) => {
    try {
      return await queryFunction(...args);
    } catch (error) {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return executeWithRetry(...args);
      }
      throw error;
    }
  }, [queryFunction, retryCount, maxRetries]);

  return { executeWithRetry, retryCount };
}
```

## Performance Optimization

### Debounced Search

```javascript
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { debounce } from 'lodash';

export function useSearchFeatures(searchTerm) {
  const debouncedSearch = useMemo(
    () => debounce((term) => {
      // Trigger search
    }, 300),
    []
  );

  const { data, loading } = useQuery(SEARCH_FEATURES, {
    variables: { searchTerm },
    skip: !searchTerm || searchTerm.length < 3,
  });

  return { results: data?.searchFeatures, loading };
}
```

### Pagination

```javascript
export function useFeaturesPagination() {
  const { data, loading, fetchMore } = useQuery(GET_FEATURES_PAGINATED, {
    variables: { offset: 0, limit: 20 },
  });

  const loadMore = () => {
    fetchMore({
      variables: { offset: data.features.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          features: [...prev.features, ...fetchMoreResult.features],
        };
      },
    });
  };

  return {
    features: data?.features || [],
    loading,
    loadMore,
    hasMore: data?.hasMore,
  };
}
