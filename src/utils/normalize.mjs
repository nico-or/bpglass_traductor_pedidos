export function normalizeString(str) {
  if (!isUsefulValue(str)) return "";
  return str
    .toUpperCase()
    .normalize("NFD") // Normalize diacritics to remove accents
    .replace(/[^A-Z0-9]/g, "") // Remove non-alphanumeric characters
    .replace(/(?<![0-9])0/g, ""); // Remove leading zeros not preceded by another digit
}

export function isUsefulValue(val) {
  return val !== null && val !== undefined && val !== "";
}

// transforms a string number like 1.000,5 to 1000.5
export function excelString2Number(str) {
  return Math.round(str.replace(".", "").replace(",", "."));
}
