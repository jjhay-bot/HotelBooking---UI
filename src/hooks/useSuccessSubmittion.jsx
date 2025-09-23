import { useReactiveVar } from "@apollo/client";
import {
  landingPageVar,
  lastModuleVar,
} from "@gql/reactiveVar";
import { onSuccess, onError } from "@gql/uiActions";
import { startCase } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";

export default function useSuccessSubmittion(module) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const landingPage = useReactiveVar(landingPageVar);
  const isLastModule = useReactiveVar(lastModuleVar);


  const onCompleted = async (redirectTo) => {
    try {
      if (isLastModule) {
        navigate(redirectTo ?? "/success");
      } else {
        navigate(redirectTo ?? landingPage);
        onSuccess(`${module ?? startCase(pathname)} submitted!`);
      }
    } catch (error) {
      // Show error in web UI using notification system
      onError(`🚨 Navigation Error: ${error.message}`);
      // Fallback navigation
      if (typeof window !== 'undefined' && window.history) {
        window.history.back();
      }
    }
  };

  return { onCompleted };
}
