import { describe, test, expect } from "vitest";
import { parseComposicionLine } from "@/utils/parsing.mjs";

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
