export const emptyDefaults = {
  bank_name: "",
  account_number: "",
  account_name: "",
  routing_number: "",
  swift_code: "",
  is_active: true,
};

export const transformPlatformBankData = (data) => {
  return {
    bank_name: data?.bank_name,
    account_number: data?.account_number,
    account_name: data?.account_name,
    routing_number: data?.routing_number,
    swift_code: data?.swift_code,
    is_active: data?.is_active,
  };
};
