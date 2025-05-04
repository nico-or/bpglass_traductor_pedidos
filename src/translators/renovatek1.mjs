import { parseComposicionLine } from "../utils/parsing.mjs";
import { excelString2Number } from "../utils/normalize.mjs";

// Input format:
// [0] referencia
// [1]
// [2]
// [3]
// [4] composicion (5/10/5)
// [5]
// [6]
// [7] cantidad
// [8]
// [9] ancho
// [10]
// [11] alto

export function translateRenovatekInput1(inputText) {
  const lines = inputText
    .split("\n")
    .map((line) => line.split("\t"))
    .filter((arr) => arr[4] && arr[4] !== undefined);

  const pedidos = lines.map((arr) => ({
    referencia: arr[0],
    cantidad: excelString2Number(arr[7]),
    ancho: excelString2Number(arr[9]),
    alto: excelString2Number(arr[11]),
    composicion: parseComposicionLine(arr[4]),
  }));

  const odd = pedidos.filter((_, i) => i % 2 === 0);
  const even = pedidos.filter((_, i) => i % 2 !== 0);

  odd.forEach((o, i) => {
    o.referencia += " " + (even[i]?.referencia || "");
  });

  return odd;
}
