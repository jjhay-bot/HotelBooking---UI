import updateCompletionStatuses from "@/utils/updateCompletionStatuses";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_STORE_CRITERIONS, GET_STORE_PROFILE } from "@gql/queries";
import {
  accessPointVar,
  criterionsVar,
  landingPageVar,
  lastModuleVar,
  storeProfileVar,
  tempXAppTypeVar,
  tierStateVar,
  webviewInitVar,
} from "@gql/reactiveVar";
import { every, isNaN, sumBy } from "lodash";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { sortCriterion } from "@/utils/sortCriterion";

const useGetStoreData = (featureCode) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useReactiveVar(webviewInitVar); // Trigger re-render when JWT is received
  const hasToken = !!sessionStorage.getItem("authToken");

  const [profile, setProfile] = useState();
  const [completed, setCompleted] = useState(0);
  const [requirements, setRequirements] = useState([]);

  useQuery(GET_STORE_PROFILE, {
    fetchPolicy: "network-only",
    skip: !hasToken, // Skip if no token
    onCompleted: (data) => {
      setProfile(data?.get_store_profile);
      storeProfileVar(data?.get_store_profile);
    },
  });

  useQuery(GET_STORE_CRITERIONS, {
    fetchPolicy: "network-only",
    variables: {
      featureCode,
    },
    skip: !hasToken, // Skip if no token
    onCompleted: (data) => {
      let criterions = Object.entries(
        data?.get_store_criterions_by_feature_v2?.criterions,
      ).flatMap(([, value]) => {
        const groupedStatus = every(value, { status: "COMPLETED" })
          ? "COMPLETED"
          : value?.[0]?.status;

        const currentTierCompleted = isNaN(+value?.[0]?.code);
        const serializeCode =
          value?.[0]?.code === "home_details"
            ? "address"
            : value?.[0]?.code.match(/point/)
              ? "point"
              : value?.[0]?.code;

        return currentTierCompleted
          ? {
            ...value?.[0],
            code: serializeCode,
            status: groupedStatus,
          }
          : [];
      });

      const submittedModules = sessionStorage.getItem("submittedModules");
      const existingModules = JSON.parse(submittedModules) || [];

      criterions = updateCompletionStatuses(criterions, existingModules);

      // sort manually base on figma :/ (should define in backend later)
      criterions = sortCriterion(criterions);

      setRequirements(criterions || []);

      const countCompleted = sumBy(criterions, { status: "COMPLETED" });

      const isLastModule = criterions.length > 0 && criterions.length === countCompleted

      lastModuleVar(isLastModule);

      setCompleted(countCompleted);
      criterionsVar(criterions);

      if (isLastModule) {
        navigate("/success");
      }
    },
  });

  landingPageVar("/" + sessionStorage.getItem("accessPoint"));
  accessPointVar(searchParams.get("service") ?? "central");
  tempXAppTypeVar(searchParams.get("apptype") || "marketplace");
  tierStateVar(searchParams.get("tier") || "1");

  return {
    profile,
    completed,
    requirements,
  };
};

export default useGetStoreData;
