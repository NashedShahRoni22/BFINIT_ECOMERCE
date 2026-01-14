export const createStorePayload = (data) => {
  const storeData = {
    storeName: data?.name,
    storeEmail: data?.email,
    currencySymbol: data?.currency_symbol,
    currencyCode: data?.currency_code,
    currencyName: data?.currency_name,
    storePhone: `${data?.phone_code}${data?.mobile}`,
    storeTelephone: data?.telephone
      ? `${data?.phone_code}${data?.telephone}`
      : "",
    storeAddress: `${data?.address},`,
    storeFacebookLink: data?.facebook,
    storeTwitterLink: data?.twitter,
    storeYoutubeLink: data?.youtube,
    storeInstagramLink: data?.instagram,
    storeTheme: "default",
    productType: "fashion",
    country: data?.country,
    timeZone: data?.time_zone,
  };

  const formData = new FormData();
  formData.append("storeData", JSON.stringify(storeData));
  formData.append("storeLogo", data?.logo.file);
  formData.append("storeFavicon", data?.favicon.file);

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
  const cleanedAddress = address.replace(/,\s*$/, "");
  return cleanedAddress;
};

export const fillFormWithStoreData = (store, countryData, setValue) => {
  if (store?.message !== "store Preference retrived succesfully") return;

  const phoneCode = countryData?.phone_code;

  console.log(phoneCode);

  const formValues = {
    address: cleanAddress(store?.storeAddress),
    country: store?.country,
    currency_code: store?.currencyCode,
    currency_name: store?.currencyName,
    currency_symbol: store?.currencySymbol,
    email: store?.storeEmail,
    facebook: store?.storeFacebookLink,
    instagram: store?.storeInstagramLink,
    mobile: cleanPhoneNumber(phoneCode, store?.storePhone),
    name: store?.storeName,
    phone_code: phoneCode,
    telephone: cleanPhoneNumber(phoneCode, store?.storeTelephone),
    time_zone: store?.timeZone,
    twitter: store?.storeTwitterLink,
    youtube: store?.storeYoutubeLink,
    logo: store?.storeLogo,
    favicon: store?.storeFavicon,
  };

  Object.entries(formValues).forEach(([key, value]) => {
    setValue(key, value);
  });
};
