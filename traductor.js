"use strict";

// separador dictionary
const separadorMap = new Map();
separadorMap.set("6", "Sep 5,5");
separadorMap.set("8", "Sep 7,5");
separadorMap.set("10", "Sep 9,5");
separadorMap.set("12", "Sep 11,5");
separadorMap.set("14", "Sep 14,5");
separadorMap.set("15", "Sep 14,5");
separadorMap.set("19", "Sep 19,5");
separadorMap.set("20", "Sep 19,5");

// vidrio dictionary
const vidrioMap = new Map();
vidrioMap.set("4", "INC 4");
vidrioMap.set("5", "INC 5");
vidrioMap.set("6", "INC 6");
vidrioMap.set("8", "INC 8");
vidrioMap.set("4 SATEN", "SATEN 4");
vidrioMap.set("4 SATÉN", "SATEN 4");
vidrioMap.set("4 SEMILLA", "SEMILLA 4");
vidrioMap.set("6LAM", "LAM 6");
vidrioMap.set("6 LAM", "LAM 6");
vidrioMap.set("8LAM", "LAM 8");
vidrioMap.set("8 LAM", "LAM 8");
vidrioMap.set("10LAM", "LAM 10");
vidrioMap.set("10 LAM", "LAM 10");

// get relevant elements
const input_textarea = document.querySelector("#input_textarea");
const input_button = document.querySelector("#input_button");
const output_textarea = document.querySelector("#output_textarea");
const output_button = document.querySelector("#output_button");
const erase_button = document.querySelector("#erase_button");

// Split lines utility functions
const splitOnChar = (input, char) => input.split(char);
const splitOnTab = (input) => splitOnChar(input, "\t");
const splitOnSlash = (input) => splitOnChar(input, "/");
const splitOnNewLine = (input) => splitOnChar(input, "\n");

// filters out lines without usefull information
const notValue = (input, value) => input !== value;
const notNull = (input) => notValue(input, null);
const notUndefined = (input) => notValue(input, undefined);
const notEmptyLine = (input) => notValue(input, "");
const isUsefullValue = (value) =>
  notNull(value) && notUndefined(value) && notEmptyLine(value);

const lineHasDescription = (line) => {
  const value = splitOnTab(line)[4];
  return isUsefullValue(value);
};

const lineHasQuantity = (line) => {
  const value = splitOnTab(line)[7];
  return isUsefullValue(value);
};

// transforms a string number like 1.000,5 to 1000.5
const excelString2Number = (string) =>
  Math.round(string.replace(".", "").replace(",", "."));

// splits composicion line (ex: "4/10/4 SATEN")
const parseComposicionLine = (line) => {
  const arr = splitOnSlash(line);
  return {
    vidrio_1: vidrioMap.get(arr[0]),
    vidrio_2: vidrioMap.get(arr[2]),
    separador_1: separadorMap.get(arr[1]),
    color_1: "BR OSC",
  };
};

// splits full 'pedido' line
const parsePosicionLine = (line) => {
  const array = splitOnTab(line);
  return {
    reference: array[0],
    count: excelString2Number(array[7]),
    width: excelString2Number(array[9]),
    height: excelString2Number(array[11]),
    composition: parseComposicionLine(array[4]),
  };
};

// Campos de la planilla "Carga Masiva"
/* 
Cantidad
Ancho (mm)
Alto (mm)
Vidrio 1
Vidrio 2
Vidrio 3
Separador 1
Color separador 1
Separador 2
Color separador 2
Forma
Palillo
Cantidad verticales
Cantidad horizontal
Referencia
*/
const writePedido = (pedido) => {
  return [
    pedido.count,
    pedido.width,
    pedido.height,
    pedido.composition.vidrio_1,
    pedido.composition.vidrio_2,
    ,
    pedido.composition.separador_1,
    pedido.composition.color_1,
    ,
    ,
    ,
    ,
    ,
    ,
    pedido.reference,
  ].join("\t");
};

input_button.addEventListener("click", (event) => {
  event.preventDefault();
  const pedidos = splitOnNewLine(input_textarea.value)
    .filter(lineHasDescription)
    .map(parsePosicionLine);

  const mergedDescriptions = pedidos.map((pedido, idx, pedidos) => {
    if (idx < pedidos.length - 1) {
      pedido.reference += ` ${pedidos[idx + 1].reference}`;
    }
    return pedido;
  });
  const filteredBottomLines = mergedDescriptions.filter(
    (pedido) => pedido.count !== 0
  );

  const output = filteredBottomLines.map(writePedido).join("\n");
  output_textarea.value = output;
});

output_button.onclick = (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(output_textarea.value);
};

erase_button.onclick = (event) => {
  console.log("erasing...");
  event.preventDefault();
  input_textarea.value = "";
  output_textarea.value = "";
};

// Botón para operación completa (pegar+traducir+copiar)
// Deshabilitado hasta comprobar su necesidad.

// document.querySelector("button#paste_button").addEventListener("click", () => {
//   navigator.clipboard.readText().then((text) => {
//     input_textarea.value = text;
//     input_button.click();
//     output_button.click();
//   });
// });
