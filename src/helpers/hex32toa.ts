export const hex32Toa = (hexx: string) => {
  const hex = hexx.toString(); //force conversion
  let str = "";
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};

export const stringToHex32 = (tmp: string) => {
  let str = "";
  for (let i = 0; i < tmp.length; i++) {
    str += tmp[i].charCodeAt(0).toString(16);
  }
  return str.toUpperCase();
};
