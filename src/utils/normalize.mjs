export function normalizeString(str) {
  if (!isUsefulValue(str)) return "";
  return str
    .toUpperCase()
    .normalize("NFD") // Normalize diacritics to remove accents
    .replace(/[\u0300-\u036f]/g, "") // Remove remaining diacritic marks
    .replace(/[\., ]/g, ""); // Remove commas and spaces
}

export function isUsefulValue(val) {
  return val !== null && val !== undefined && val !== "";
}

// transforms a string number like 1.000,5 to 1000.5
export function excelString2Number(str) {
  return Math.round(str.replace(".", "").replace(",", "."));
}
