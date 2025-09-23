import { Grid } from "@mui/material";
import TypographyDemo from "./TypographyDemo";
import ButtonDemo from "./ButtonDemo";
import TextFieldDemo from "./TextFieldDemo";
import CheckboxDemo from "./CheckboxDemo";
import RadioDemo from "./RadioDemo";
import SwitchDemo from "./SwitchDemo";
import SelectAutocompleteDemo from "./SelectAutocompleteDemo";
import AllDialogSamples from "./DialogDemo";
import CardDemo from "./CardDemo";
import PaperDemo from "./PaperDemo";
import DemoModal from "./ModalDemo";
import TabsDemo from "./TabsDemo";
import SimpleForm from "@ui/SimpleForm";

export function UiDemo() {
  return (
    <Grid size={6}>
      <SimpleForm />
      <TypographyDemo />
      <ButtonDemo />
      <TextFieldDemo />
      <CheckboxDemo />
      <RadioDemo />
      <SwitchDemo />
      <SelectAutocompleteDemo />
      <AllDialogSamples />
      <CardDemo />
      <PaperDemo />
      <DemoModal />
      <TabsDemo />
      {/* <DrawerDemo /> */}
    </Grid>
  );
}
