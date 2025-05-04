import { parseComposicionLine } from "../utils/parsing.mjs";
import { excelString2Number } from "../utils/normalize.mjs";

// Input format:
// [0] referencia
// [1] composicion (5/10/5)
// [2] cant1
// [3] ancho (929,00)
// [4] alto (2.114,00)

export function translateRenovatekInput2(inputText) {
  const input = inputText
    .split("\n")
    .map((line) => line.split("\t"))
    .filter((arr) => arr[0] !== "" && arr[2] !== "");

  const pedidos = input.map((arr) => ({
    referencia: arr[0],
    cantidad: excelString2Number(arr[2]),
    ancho: excelString2Number(arr[3]),
    alto: excelString2Number(arr[4]),
    composicion: parseComposicionLine(arr[1]),
  }));

  return pedidos;
}
