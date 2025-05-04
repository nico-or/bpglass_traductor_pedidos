import { describe, test, expect } from "vitest";
import { writePedido } from "@/renderer/writer.mjs";
describe("writePedido", () => {
  test("double glassed window", () => {
    const pedido = {
      cantidad: 2,
      ancho: 1000,
      alto: 1500,
      composicion: {
        vidrio_1: "INC 5",
        vidrio_2: "LAM 6",
        separador_1: { medida: "Sep 9,5", color: "BR OSC" },
      },
      forma: false,
      referencia: "V1",
    };
    const expected =
      "2\t1000\t1500\tINC 5\tLAM 6\t\tSep 9,5\tBR OSC\t\t\t\t\t\t\tV1";
    expect(writePedido(pedido)).toBe(expected);
  });

  test("single glassed window", () => {
    const pedido = {
      cantidad: 1,
      ancho: 400,
      alto: 1200,
      composicion: {
        vidrio_1: "SATEN 4",
        separador_1: { medida: "", color: "", alias: [] }, // see utils/parsing.mjs for the default value
      },
      forma: false,
      referencia: "V1",
    };
    const expected = "1\t400\t1200\tSATEN 4\t\t\t\t\t\t\t\t\t\t\tV1";
    expect(writePedido(pedido)).toBe(expected);
  });

  test("triple glassed window", () => {
    const pedido = {
      cantidad: 2,
      ancho: 1000,
      alto: 1500,
      composicion: {
        vidrio_1: "INC 5",
        vidrio_2: "INC 6",
        vidrio_3: "INC 8",
        separador_1: { medida: "Sep 9,5", color: "BR OSC" },
        separador_2: { medida: "Sep 11,5", color: "MATE" },
      },
      forma: false,
      referencia: "V1",
    };
    const expected =
      "2\t1000\t1500\tINC 5\tINC 6\tINC 8\tSep 9,5\tBR OSC\tSep 11,5\tMATE\t\t\t\t\tV1";
    expect(writePedido(pedido)).toBe(expected);
  });

  test("single glassed window with form", () => {
    const pedido = {
      cantidad: 2,
      ancho: 1000,
      alto: 1500,
      composicion: {
        vidrio_1: "INC 5",
      },
      forma: true,
      referencia: "V1",
    };
    const expected = "2\t1000\t1500\tINC 5\t\t\t\t\t\t\tF\t\t\t\tV1";
    expect(writePedido(pedido)).toBe(expected);
  });
});
