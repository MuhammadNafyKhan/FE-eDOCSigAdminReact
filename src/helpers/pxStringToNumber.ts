export const pxStringToNumber = (str: string) => {
  const withoutPx = str.replace("px", "");
  return Number.parseInt(withoutPx);
};
