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

export const fillFormWithStoreData = (store, countryData, reset) => {
  if (!store) return;

  const hasMultiCountry =
    store?.countries &&
    Array.isArray(store.countries) &&
    store.countries.length > 0;

  const defaultCountry = hasMultiCountry
    ? store.countries.find((c) => c.isDefault) || store.countries[0]
    : null;

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
    country: "",
  };

  if (store?.storeLogo) {
    formValues.logo = {
      preview: `https://ecomback.bfinit.com/${store.storeLogo}`,
      file: null,
    };
  }

  if (store?.storeFavicon) {
    formValues.favicon = {
      preview: `https://ecomback.bfinit.com/${store.storeFavicon}`,
      file: null,
    };
  }

  if (hasMultiCountry) {
    formValues.countries = store.countries.map((country) => ({
      _id: country._id, // preserve ID
      country_name: country.country_name,
      currency_name: country.currency_name,
      currency_code: country.currency_code,
      currency_symbol: country.currency_symbol,
      phone_code: country.phone_code || phoneCode,
      isDefault: country.isDefault,
    }));
  } else if (store?.country) {
    formValues.countries = [
      {
        country_name: store.country,
        currency_name: store.currencyName,
        currency_code: store.currencyCode,
        currency_symbol: store.currencySymbol,
        phone_code: phoneCode,
        isDefault: true,
      },
    ];
  } else {
    formValues.countries = [];
  }

  // Use reset so RHF sets the baseline for dirty tracking
  reset(formValues);
};

export const createPartialStorePayload = (dirtyData, allData) => {
  const defaultCountry =
    allData?.countries?.find((c) => c.isDefault) || allData?.countries?.[0];
  const phoneCode = defaultCountry?.phone_code || "";

  // Field map: form key → storeData key (with optional transform)
  const fieldMap = {
    name: () => ({ storeName: allData.name }),
    email: () => ({ storeEmail: allData.email }),
    address: () => ({ storeAddress: allData.address }),
    time_zone: () => ({ timeZone: allData.time_zone }),
    mobile: () => ({ storePhone: `${phoneCode}${allData.mobile}` }),
    telephone: () => ({
      storeTelephone: allData.telephone
        ? `${phoneCode}${allData.telephone}`
        : "",
    }),
    facebook: () => ({ storeFacebookLink: allData.facebook || "" }),
    twitter: () => ({ storeTwitterLink: allData.twitter || "" }),
    instagram: () => ({ storeInstagramLink: allData.instagram || "" }),
    youtube: () => ({ storeYoutubeLink: allData.youtube || "" }),
  };

  // Build storeData with only dirty fields
  const storeData = {};
  Object.keys(dirtyData).forEach((key) => {
    if (fieldMap[key]) {
      Object.assign(storeData, fieldMap[key]());
    }
  });

  // Always include countries (for upsert/ID preservation)
  storeData.countries = allData.countries;

  const formData = new FormData();
  formData.append("storeData", JSON.stringify(storeData));

  // Files only if actually changed
  if (allData?.logo?.file instanceof File) {
    formData.append("storeLogo", allData.logo.file);
  }
  if (allData?.favicon?.file instanceof File) {
    formData.append("storeFavicon", allData.favicon.file);
  }

  return formData;
};
