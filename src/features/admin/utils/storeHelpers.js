export const createStorePayload = (data) => {
  // Get the default country for phone codes
  const defaultCountry =
    data?.countries?.find((c) => c.isDefault) || data?.countries?.[0];
  const phoneCode = defaultCountry?.phone_code || data?.phone_code || "";

  const storeData = {
    storeName: data?.name,
    storeEmail: data?.email,

    // Multi-country support - this is the new format
    countries: data?.countries || [],

    // Keep old fields for backward compatibility (using default country data)
    currencySymbol: defaultCountry?.currency_symbol || data?.currency_symbol,
    currencyCode: defaultCountry?.currency_code || data?.currency_code,
    currencyName: defaultCountry?.currency_name || data?.currency_name,
    country: defaultCountry?.country_name || data?.country,

    storePhone: `${phoneCode}${data?.mobile}`,
    storeTelephone: data?.telephone ? `${phoneCode}${data?.telephone}` : "",
    storeAddress: `${data?.address}`,
    storeFacebookLink: data?.facebook || "",
    storeTwitterLink: data?.twitter || "",
    storeYoutubeLink: data?.youtube || "",
    storeInstagramLink: data?.instagram || "",
    storeTheme: "default",
    productType: "fashion",
    timeZone: data?.time_zone,
  };

  const formData = new FormData();
  formData.append("storeData", JSON.stringify(storeData));

  // Only append files if they exist and are File objects
  if (data?.logo?.file instanceof File) {
    formData.append("storeLogo", data.logo.file);
  }
  if (data?.favicon?.file instanceof File) {
    formData.append("storeFavicon", data.favicon.file);
  }

  return formData;
};

export const cleanPhoneNumber = (phone_code, phoneNumber) => {
  if (!phoneNumber) return "";

  let cleaned = phoneNumber.replace(/[\s\-\(\)]/g, "");

  if (phone_code && cleaned.startsWith(phone_code)) {
    cleaned = cleaned.slice(phone_code.length);
  }

  const codeWithPlus = phone_code?.startsWith("+")
    ? phone_code
    : `+${phone_code}`;
  if (cleaned.startsWith(codeWithPlus)) {
    cleaned = cleaned.slice(codeWithPlus.length);
  }

  return cleaned;
};

export const cleanAddress = (address) => {
  const cleanedAddress = address?.replace(/,\s*$/, "") || "";
  return cleanedAddress;
};

export const fillFormWithStoreData = (store, countryData, setValue) => {
  if (!store) return;

  // Check if store has new multi-country format
  const hasMultiCountry =
    store?.countries &&
    Array.isArray(store.countries) &&
    store.countries.length > 0;

  // Get default country
  const defaultCountry = hasMultiCountry
    ? store.countries.find((c) => c.isDefault) || store.countries[0]
    : null;

  // Get phone code - priority: default country > countryData
  const phoneCode = defaultCountry?.phone_code || countryData?.phone_code;

  const formValues = {
    address: cleanAddress(store?.storeAddress),
    email: store?.storeEmail,
    facebook: store?.storeFacebookLink || "",
    instagram: store?.storeInstagramLink || "",
    mobile: cleanPhoneNumber(phoneCode, store?.storePhone),
    name: store?.storeName,
    telephone: cleanPhoneNumber(phoneCode, store?.storeTelephone),
    time_zone: store?.timeZone,
    twitter: store?.storeTwitterLink || "",
    youtube: store?.storeYoutubeLink || "",
  };

  // Handle logo and favicon (these are URLs from API, not files)
  if (store?.storeLogo) {
    formValues.logo = {
      preview: `https://ecomback.bfinit.com/${store.storeLogo}`,
      file: null, // No file initially, just the preview URL
    };
  }

  if (store?.storeFavicon) {
    formValues.favicon = {
      preview: `https://ecomback.bfinit.com/${store.storeFavicon}`,
      file: null,
    };
  }

  // Handle multi-country format
  if (hasMultiCountry) {
    // Store already has countries array - use it directly
    formValues.countries = store.countries.map((country) => ({
      country_name: country.country_name,
      currency_name: country.currency_name,
      currency_code: country.currency_code,
      currency_symbol: country.currency_symbol,
      phone_code: country.phone_code || phoneCode, // Fallback to phoneCode if missing
      isDefault: country.isDefault,
    }));
  } else if (store?.country) {
    // Old single-country format - migrate to multi-country
    formValues.countries = [
      {
        country_name: store.country,
        currency_name: store.currencyName,
        currency_code: store.currencyCode,
        currency_symbol: store.currencySymbol,
        phone_code: phoneCode, // Include phone_code in migration
        isDefault: true,
      },
    ];
  } else {
    // No country data at all - initialize empty
    formValues.countries = [];
  }

  // Set all form values
  Object.entries(formValues).forEach(([key, value]) => {
    setValue(key, value);
  });
};
