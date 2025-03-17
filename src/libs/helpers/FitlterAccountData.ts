interface Account {
  role: string;
  // add other properties of Account if needed
}

export const filterAccountByRole = (accounts: Account[], roles: string[]) => {
  const filterData = accounts.filter(
    (account: Account) => roles.includes(account.role)
  );

  return filterData;
};

export const removeUneccessaryColumns = (
  data: Account[],
  keysToExclude: string[] = ["avatar", "password", "__v", "updatedAt"]
) => {
  return data.length > 0
    ? Object.keys(data[0])
        .filter((key) => !keysToExclude.includes(key))
        .map((key) => ({
          field: key,
          header: key.toUpperCase(),
          width: "auto",
        }))
    : [];
};
