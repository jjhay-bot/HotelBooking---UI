import { ProcessingIcon, RejectedIcon, SuccessIcon } from "@assets/Icons";
import { getModuleIcon } from "@utils/geModuleIcon.";
import { snakeCase } from "lodash";

export const StatusIcon = ({ status = "not_started", defaultIcon }) => {
  const state = snakeCase(status);

  const Icon = defaultIcon ?? getModuleIcon["default"];

  if (["pending", "processing"].includes(state)) return <ProcessingIcon />;
  if (["completed", "approved"].includes(state)) return <SuccessIcon />;
  if (["rejected"].includes(state)) return <RejectedIcon />;

  return <Icon />;
};
