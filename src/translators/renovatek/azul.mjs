import { excelString2Number } from "../../utils/normalize.mjs";

// Input format:
// [0] Referencia Ítem
// [1] Cantidad
// [2] Ancho (mm)
// [3] Largo (mm)
// [4] Cristal 1
// [5] Cristal 2
// [6] Separador
// [7] Color Sep

export default function translate(inputText) {
  const input = inputText
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.split("\t"))
    .filter((arr) => arr[3] !== "");

  const pedidos = input.map((arr) => ({
    referencia: arr[0],
    cantidad: excelString2Number(arr[1]),
    ancho: excelString2Number(arr[2]),
    alto: excelString2Number(arr[3]),
    composicion: {
      vidrio_1: arr[4],
      vidrio_2: arr[5],
      separador_1: {
        medida: arr[6],
        color: arr[7],
      },
    },
  }));

  return pedidos;
}
