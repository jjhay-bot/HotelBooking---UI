import MuiAutocomplete from "@utils/theme/components/MuiAutocomplete";
import MuiBackdrop from "@utils/theme/components/MuiBackdrop";
import MuiButton from "@utils/theme/components/MuiButton";
import { MuiCard } from "@utils/theme/components/MuiCard";
import MuiAlert from "@utils/theme/components/MuiAlert";
import MuiListItemButton from "@utils/theme/components/MuiListItemButton";
import MuiPaper from "@utils/theme/components/MuiPaper";
import MuiTextField from "@utils/theme/components/MuiTextField";
import MuiOutlinedInput from "./MuiOutlinedInput";
// import MuiTypography from "@utils/theme/components/MuiTypography";

const components = {
  MuiButton,
  MuiAlert,
  MuiListItemButton,
  MuiTextField,
  MuiOutlinedInput,
  // MuiTypography,
  // MuiCheckbox,
  // MuiRadio,
  // MuiSwitch,
  // ...muiDialogComponents,
  // MuiModal,
  // MuiCardHeader,
  // MuiCardContent,
  // MuiCardActions,
  MuiCard,
  MuiPaper,
  MuiBackdrop,
  // MuiTabs,
  // MuiTab,
  // MuiDrawer
  MuiAutocomplete,
  MuiStack: {
    variants: [
      {
        props: { variant: "centered" },
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    ],
  },
};

export default components;
