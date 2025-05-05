import { normalizeString, excelString2Number } from "../../utils/normalize.mjs";
import { findVidrio, findSeparador } from "../../utils/parsing.mjs";

// Input format:
// [0] Item
// [1] Referencia Item
// [2] Cantidad
// [3] Ancho
// [4] Alto
// [5] Cristal 1
// [6] Cristal 2
// [7] Separador

export default function translate(inputText) {
  const lines = inputText
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.split("\t"))
    .filter((arr) => arr[0] !== "Item" && arr[3] !== "");

  const pedidos = lines.map((arr) => {
    arr[3] = normalizeString(arr[3]);

    // Check if the ancho field contains any non-numeric characters to determine if it's a form
    const isForma = arr[3].replace(/[0-9]/g, "") !== "";

    return {
      referencia: isForma ? `FORMA ${arr[1]}` : arr[1],
      cantidad: excelString2Number(arr[2]),
      ancho: isForma ? undefined : excelString2Number(arr[3]),
      alto: isForma ? undefined : excelString2Number(arr[4]),
      composicion: {
        vidrio_1: findVidrio(arr[5]),
        vidrio_2: findVidrio(arr[6]),
        vidrio_3: undefined,
        separador_1: findSeparador(arr[7]),
        separador_2: undefined,
      },
      forma: isForma,
    };
  });

  return pedidos;
}
