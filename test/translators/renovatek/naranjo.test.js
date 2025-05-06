import { describe, test, expect } from "vitest";
import translate from "@/translators/renovatek/naranjo.mjs";

describe("translate function", () => {
  describe("en locale", () => {
    test("double glassed window with single decription", () => {
      const input =
        "V1C4D\t\t\t\t4/10/4\t\t\t2\t\t220.00\t\t1,383.00\t\t\t\t\t0.31\t\t0.63\t\t\t2,004.00\t\t\t1,485.00\n\t\t\t\t4/10/4 INCOLORO\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
      const expected = [
        {
          referencia: "V1C4D",
          cantidad: 2,
          ancho: 220,
          alto: 1383,
          composicion: {
            vidrio_1: "INC 4",
            vidrio_2: "INC 4",
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

    test("double glassed window with double decription", () => {
      const input =
        "V1C4D\t\t\t\t4/10/4\t\t\t2\t\t220.00\t\t1,383.00\t\t\t\t\t0.31\t\t0.63\t\t\t2,004.00\t\t\t1,485.00\nDORM 1\t\t\t\t4/10/4 INCOLORO\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
      const expected = [
        {
          referencia: "V1C4D DORM 1",
          cantidad: 2,
          ancho: 220,
          alto: 1383,
          composicion: {
            vidrio_1: "INC 4",
            vidrio_2: "INC 4",
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

    test("single glassed window", () => {
      const input =
        "V5 C24 A\t\t\t\tVS4 SIMPLE\t\t\t2\t\t762.50\t\t1,198.00\t\t\t\t\t0.91\t\t1.83\t\t\t1,765.00\t\t\t1,799.00\nDORMITORIO 2\t\t\t\tVS 4mm incoloro\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
      const expected = [
        {
          referencia: "V5 C24 A DORMITORIO 2",
          cantidad: 2,
          ancho: 763,
          alto: 1198,
          composicion: {
            vidrio_1: "INC 4",
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
  });

  describe("es locale", () => {
    test("double glassed window with single decription", () => {
      const input =
        "V1C4D\t\t\t\t4/10/4\t\t\t2\t\t220,00\t\t1.383,00\t\t\t\t\t0,31\t\t0,63\t\t\t2.004,00\t\t\t1.485,00\n\t\t\t\t4/10/4 INCOLORO\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
      const expected = [
        {
          referencia: "V1C4D",
          cantidad: 2,
          ancho: 220,
          alto: 1383,
          composicion: {
            vidrio_1: "INC 4",
            vidrio_2: "INC 4",
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

    test("double glassed window with double decription", () => {
      const input =
        "V1C4D\t\t\t\t4/10/4\t\t\t2\t\t220,00\t\t1.383,00\t\t\t\t\t0,31\t\t0,63\t\t\t2.004,00\t\t\t1.485,00\nDORM 1\t\t\t\t4/10/4 INCOLORO\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
      const expected = [
        {
          referencia: "V1C4D DORM 1",
          cantidad: 2,
          ancho: 220,
          alto: 1383,
          composicion: {
            vidrio_1: "INC 4",
            vidrio_2: "INC 4",
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

    test("single glassed window", () => {
      const input =
        "V5 C24 A\t\t\t\tVS4 SIMPLE\t\t\t2\t\t762,50\t\t1.198,00\t\t\t\t\t0,91\t\t1,83\t\t\t1.765,00\t\t\t1.799,00\nDORMITORIO 2\t\t\t\tVS 4mm incoloro\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
      const expected = [
        {
          referencia: "V5 C24 A DORMITORIO 2",
          cantidad: 2,
          ancho: 763,
          alto: 1198,
          composicion: {
            vidrio_1: "INC 4",
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
  });
});
