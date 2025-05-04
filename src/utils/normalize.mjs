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

// transforms a string number like 1.000,5 to 1001
export function excelString2Number(input) {
  const str = input.replace(/[^0-9.,]/g, "");

  const hasComma = str.includes(",");
  const hasDot = str.includes(".");

  // Case: both separators are present, determine format based on order
  if (hasComma && hasDot) {
    const lastComma = str.lastIndexOf(",");
    const lastDot = str.lastIndexOf(".");

    if (lastComma > lastDot) {
      // es_CL: "." as thousands, "," as decimal
      return Math.round(parseFloat(str.replace(/\./g, "").replace(",", ".")));
    } else {
      // en_US: "," as thousands, "." as decimal
      return Math.round(parseFloat(str.replace(/,/g, "")));
    }
  }

  // Case: only one separator
  if (hasComma) {
    if (str.match(/,\d{1,2}$/)) {
      // If it ends in ",x" or ",xx" -> decimal (es_CL)
      return Math.round(parseFloat(str.replace(/\./g, "").replace(",", ".")));
    } else {
      // Just thousand separator (en_US)
      return parseInt(str.replace(/,/g, ""), 10);
    }
  }

  if (hasDot) {
    if (str.match(/\.\d{1,2}$/)) {
      // If it ends in ".x" or ".xx" -> decimal (en_US)
      return Math.round(parseFloat(str.replace(/,/g, "")));
    } else {
      // Just thousand separator (es_CL)
      return parseInt(str.replace(/\./g, ""), 10);
    }
  }

  // No separator: just parse it directly
  return parseInt(str, 10);
}
