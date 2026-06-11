const generatePublicSubdomain = (name) => {
  const slug =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "store";

  return `${slug}-${Math.random().toString(36).slice(2, 7)}`;
};

const generateStoreCode = (name) => {
  const prefix =
    name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 4) || "str";
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
};

export const createStorePayload = (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("publicSubdomain", generatePublicSubdomain(data.name)); // TODO: generate via backend
  formData.append("storeCode", generateStoreCode(data.name)); // TODO: generate via backend
  formData.append("defaultCountryId", data.default_country_id);

  data.countries.forEach((country) => {
    formData.append("countryIds", country.id);
  });

  if (data?.logo?.file) {
    formData.append("logo", data.logo.file);
  }

  if (data?.favicon?.file) {
    formData.append("favicon", data.favicon.file);
  }

  formData.append("isActive", data.is_active);

  return formData;
};
