import { describe, test, expect } from "vitest";
import translate from "@/translators/bastro/default.mjs";

describe("translate function", () => {
  test("double glassed window", () => {
    const input = "1\tSU V-1\t2\t1094\t1469\tINC 5\tBR 5\tSEP. 10 Bronce";
    const expected = [
      {
        referencia: "SU V-1",
        cantidad: 2,
        ancho: 1094,
        alto: 1469,
        composicion: {
          vidrio_1: "INC 5",
          vidrio_2: "BR 5",
          vidrio_3: undefined,
          separador_1: {
            color: "BR OSC",
            medida: "Sep 9,5",
          },
          separador_2: undefined,
        },
        forma: false,
      },
    ];
    expect(translate(input)).toMatchObject(expected);
  });

  test("double glassed window with FORMA", () => {
    const input = "3\tLC V3\t1\tFORMA \t\tINC 5\tINC 5\tSEP. 15 Bronce";
    const expected = [
      {
        referencia: "FORMA LC V3",
        cantidad: 1,
        ancho: undefined,
        alto: undefined,
        composicion: {
          vidrio_1: "INC 5",
          vidrio_2: "INC 5",
          vidrio_3: undefined,
          separador_1: {
            color: "BR OSC",
            medida: "Sep 14,5",
          },
          separador_2: undefined,
        },
        forma: true,
      },
    ];
    expect(translate(input)).toMatchObject(expected);
  });

  test("single glassed window", () => {
    const input = "9\tSS V8\t1\t959\t862\tINC 5";
    const expected = [
      {
        referencia: "SS V8",
        cantidad: 1,
        ancho: 959,
        alto: 862,
        composicion: {
          vidrio_1: "INC 5",
          vidrio_2: undefined,
          vidrio_3: undefined,
          separador_1: undefined,
          separador_2: undefined,
        },
        forma: false,
      },
    ];
    expect(translate(input)).toMatchObject(expected);
  });

  test("single glassed window with forma", () => {
    const input = "9\tSS V8\t1\tFORMA\t\tINC 5";
    const expected = [
      {
        referencia: "FORMA SS V8",
        cantidad: 1,
        ancho: undefined,
        alto: undefined,
        composicion: {
          vidrio_1: "INC 5",
          vidrio_2: undefined,
          vidrio_3: undefined,
          separador_1: undefined,
          separador_2: undefined,
        },
        forma: true,
      },
    ];
    expect(translate(input)).toMatchObject(expected);
  });
});
