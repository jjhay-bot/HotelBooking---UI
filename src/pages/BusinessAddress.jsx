import ResponsiveLayout from "@components/atoms/ResponsiveLayout";
import Screen from "@components/atoms/Screen";
import { Stack, Typography } from "@mui/material";

const BusinessAddress = () => {
  return (
    <Screen >

      <ResponsiveLayout
        top={
          <Stack flex={1} px={2.5} gap={1}>
            <Typography variant="h3" mr={1}>
              Business Address
            </Typography>

            <Typography variant="body2">
              Ilagay ang address ng inyong negosyo, kung saan gagamitin ang serbisyo ng
              Growsari
            </Typography>
          </Stack>
        }
      >
        {/* <Stack flex={1} px={2.5} gap={1}>
          <Stack component="form" onSubmit={handleSubmit} sx={{ py: 1.5 }} spacing={3}>
            <FormTextField
              required
              name="home_details"
              label="House number / lot number / building"
              onChange={handleChange}
              errors={errors}
              value={formData?.home_details || ""}
            />
            <FormTextField
              name="street"
              label="Street name"
              onChange={handleChange}
              errors={errors}
              value={formData?.street || ""}
            />

            <FormTextField
              name="landmark"
              label="Landmarks"
              onChange={handleChange}
              optional
              errors={errors}
              value={formData?.landmark || ""}
            />

            <FormAutocomplete
              name="province"
              label="Province kung saan ang tindahan"
              options={provinceOptions}
              value={formData.province}
              onChange={handleChange}
              onSelect={onSelect}
              errors={errors}
            />

            <FormAutocomplete
              name="city"
              label="City"
              disabled={!formData.province}
              options={filteredCities}
              value={formData.city}
              onSelect={onSelect}
              errors={errors}
            />
            <FormAutocomplete
              name="barangay"
              label="Barangay"
              disabled={!formData.city}
              options={filteredBarangays}
              value={formData.barangay}
              onSelect={onSelect}
              errors={errors}
            />
          </Stack>
        </Stack> */}
      </ResponsiveLayout>
    </Screen>
  );
};

export default BusinessAddress;
