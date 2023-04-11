export const shouldLogout = (message: string) => {
  const messageInLowerCase = message.toLocaleLowerCase();
  if (
    messageInLowerCase.includes("authentication failed") ||
    messageInLowerCase.includes("expired session")
  ) {
    return true;
  } else {
    return false;
  }
};
