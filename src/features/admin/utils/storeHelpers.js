export const createStorePayload = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("publicSubdomain", "test-subdomain-2"); // TODO: Replace with actual subdomain logic
  formData.append("storeCode", "test-code-2"); // TODO: Replace with actual store code logic
  formData.append("defaultCountryId", data.default_country_id);

  data.countries.forEach((country) => {
    formData.append("country_ids", country.id);
  });

  if (data?.logo?.file) {
    formData.append("logo", data.logo.file);
  }

  if (data?.favicon?.file) {
    formData.append("favicon", data.favicon.file);
  }

  formData.append("is_active", data.is_active);

  return formData;
};
