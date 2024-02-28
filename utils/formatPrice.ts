export const formatPrice = (account: number) => {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
  }).format(account);
};
