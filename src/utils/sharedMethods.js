import { addonStatetoCost, unBilledFields } from "./sharedState";

export const roundTo = (num, decimalPlaces) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
};
export const isEmpty = (key) => {
  if (typeof key === "string" && key == "") return true;
  else if (key.length == 0) return true;
  return false;
};
export const calculateTotalCost = (obj) => {
  console.log("object for creating total cost", obj)
  let total = 0;
  Object.keys(obj).forEach((field) => {
    if (field == "personalityInfo" || field == "basicInfo") {
      total += Object.keys(obj[field]).reduce((acc, curr) => {
        if (obj[field][curr] && !unBilledFields.includes(curr)) return acc + 9.95;
        return acc;
      }, 0);
    } else if (field == "wordLimit" || field == "totalPaidPhotos") {
      total += obj[field] * 9.95;

    } else if (field == "premiumPlacement" || field == "featuredPlacement") {
      console.log("prem obj field", obj[field], addonStatetoCost[field])
      total += obj[field] * addonStatetoCost[field]
    }
    else {
      console.log("field", field, "cost", addonStatetoCost[field]);
      total += obj[field] ? addonStatetoCost[field] : 0;
    }
  });
  total = roundTo(total, 2);
  return total
}

const checkObjEmpty = (obj) => {
  return Object.values(obj).every((value) => value == false)
};
export const checkForChange = (obj, currPhotos) => {
  return (
    currPhotos.total == 0 &&
    checkObjEmpty(obj.basicInfo) &&
    checkObjEmpty(obj.personalityInfo)
  );
};