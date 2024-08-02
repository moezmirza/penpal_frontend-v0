export const roundTo = (num, decimalPlaces) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
};
export const isEmpty = (key) => {
  if (typeof key === "string" && key == "") return true;
  else if (key.length == 0) return true;
  return false;
};
