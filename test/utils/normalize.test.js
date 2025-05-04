import { describe, test, expect } from "vitest";
import { normalizeString, excelString2Number } from "@/utils/normalize.mjs";

describe("normalizeString", () => {
  test("removes accents, punctuation and spaces", () => {
    expect(normalizeString("Sépárádór 6,0")).toBe("SEPARADOR60");
    expect(normalizeString(" Sépárádór 6,0!")).toBe("SEPARADOR60");
  });
  test("handles accents and modifiers", () => {
    expect(normalizeString("SATÉN 4")).toBe("SATEN4");
  });
  test("removes 0 not preceded by other numbers", () => {
    expect(normalizeString("semilla 04 mm")).toBe("SEMILLA4MM");
    expect(normalizeString("laminado 10 mm")).toBe("LAMINADO10MM");
  });
  test("works with bastro separador input", () => {
    expect(normalizeString("SEP. 12 Bronce")).toBe("SEP12BRONCE");
  });
});

describe("excelString2Number", () => {
  test("works with es number format", () => {
    expect(excelString2Number("1.000,5")).toBe(1001);
  });
  test("works with en number format", () => {
    expect(excelString2Number("1,000.5")).toBe(1001);
  });
  test("works with es number format with spaces", () => {
    expect(excelString2Number("1.000 , 5")).toBe(1001);
  });
  test("works with en number format with spaces", () => {
    expect(excelString2Number("1, 000 . 5")).toBe(1001);
  });
  test("works with integer es number format", () => {
    expect(excelString2Number("1.000")).toBe(1000);
  });
  test("works with integer en number format", () => {
    expect(excelString2Number("1,000")).toBe(1000);
  });
  test("works with small integers numbers", () => {
    expect(excelString2Number("15")).toBe(15);
  });
});
