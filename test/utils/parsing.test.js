import { describe, test, expect } from "vitest";
import { parseComposicionLine, findVidrio } from "@/utils/parsing.mjs";

describe("parseComposicionLine", () => {
  test("double glassed window composition (v1/sep1/v2)", () => {
    const input = "5/10/6LAM";
    const expected = {
      vidrio_1: "INC 5",
      vidrio_2: "LAM 6",
      vidrio_3: undefined,
      separador_1: {
        color: "BR OSC",
        medida: "Sep 9,5",
      },
      separador_2: undefined,
    };
    expect(parseComposicionLine(input)).toMatchObject(expected);
  });

  test("triple glassed window composition (v1/sep1/v2/sep2/v3)", () => {
    const input = "5/10/6LAM/10/4";
    const expected = {
      vidrio_1: "INC 5",
      vidrio_2: "LAM 6",
      vidrio_3: "INC 4",
      separador_1: {
        color: "BR OSC",
        medida: "Sep 9,5",
      },
      separador_2: {
        color: "BR OSC",
        medida: "Sep 9,5",
      },
    };
    expect(parseComposicionLine(input)).toMatchObject(expected);
  });
});

describe("findVidrio", () => {
  test("with valid vidrio alias", () => {
    const input = "INC 4";
    const expected = "INC 4";
    expect(findVidrio(input)).toBe(expected);
  });

  test("with invalid characters", () => {
    const input = " Fl!t@# 6 ";
    const expected = "INC 6";
    expect(findVidrio(input)).toBe(expected);
  });

  test("with missing vidrio alias", () => {
    const input = "invalid input";
    const expected = undefined;
    expect(findVidrio(input)).toBe(expected);
  });

  describe("laminados", () => {
    test("lam 8 seg should return LAM 8", () => {
      const input = "LAM 8 seg";
      const expected = "LAM 8";
      expect(findVidrio(input)).toBe(expected);
    });

    test("lam acu 6 should return LAM ACU6", () => {
      const input = "LAM ACU 6";
      const expected = "LAM ACU6";
      expect(findVidrio(input)).toBe(expected);
    });

    test("lam 8 acu should return LAM ACU8", () => {
      const input = "LAM 8 acu";
      const expected = "LAM ACU8";
      expect(findVidrio(input)).toBe(expected);
    });
  });

  describe("Renovatek dimensionado notation", () => {
    test("VS4 should return INC 4", () => {
      const input = "VS4";
      const expected = "INC 4";
      expect(findVidrio(input)).toBe(expected);
    });

    test("VS6SIMPLE should return INC 6", () => {
      const input = "VS6SIMPLE";
      const expected = "INC 6";
      expect(findVidrio(input)).toBe(expected);
    });

    test("VS6LAMINADO should return LAM 6", () => {
      const input = "VS6LAMINADO";
      const expected = "LAM 6";
      expect(findVidrio(input)).toBe(expected);
    });
  });
});
