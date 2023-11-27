"use strict";

// separador dictionary
const separadorMap = new Map();
separadorMap.set("6", { medida: "Sep 5,5", color: "BR OSC" });
separadorMap.set("8", { medida: "Sep 7,5", color: "BR OSC" });
separadorMap.set("10", { medida: "Sep 9,5", color: "BR OSC" });
separadorMap.set("12", { medida: "Sep 11,5", color: "BR OSC" });
separadorMap.set("14", { medida: "Sep 14,5", color: "BR OSC" });
separadorMap.set("15", { medida: "Sep 14,5", color: "BR OSC" });
separadorMap.set("19", { medida: "Sep 19,5", color: "BR OSC" });
separadorMap.set("20", { medida: "Sep 19,5", color: "BR OSC" });
separadorMap.set("SEP6BRONCE", { medida: "Sep 5,5", color: "BR OSC" });
separadorMap.set("SEP8BRONCE", { medida: "Sep 7,5", color: "BR OSC" });
separadorMap.set("SEP10BRONCE", { medida: "Sep 9,5", color: "BR OSC" });
separadorMap.set("SEP12BRONCE", { medida: "Sep 11,5", color: "BR OSC" });
separadorMap.set("SEP15BRONCE", { medida: "Sep 14,5", color: "BR OSC" });
separadorMap.set("SEP19BRONCE", { medida: "Sep 19,5", color: "BR OSC" });
separadorMap.set("SEP20BRONCE", { medida: "Sep 19,5", color: "BR OSC" });
separadorMap.set("SEP6MATE", { medida: "Sep 5,5", color: "MATE" });
separadorMap.set("SEP8MATE", { medida: "Sep 7,5", color: "MATE" });
separadorMap.set("SEP10MATE", { medida: "Sep 9,5", color: "MATE" });
separadorMap.set("SEP12MATE", { medida: "Sep 11,5", color: "MATE" });
separadorMap.set("SEP15MATE", { medida: "Sep 14,5", color: "MATE" });
separadorMap.set("SEP19MATE", { medida: "Sep 19,5", color: "MATE" });
separadorMap.set("SEP20MATE", { medida: "Sep 19,5", color: "MATE" });
separadorMap.set("SEP10SUPERSPACER", { medida: "Sep 9,5", color: "BR OSC" });
separadorMap.set("SEP12SUPERSPACER", { medida: "Sep 11,5", color: "BR OSC" });

// vidrio dictionary
const vidrioMap = new Map();
vidrioMap.set("4", "INC 4");
vidrioMap.set("5", "INC 5");
vidrioMap.set("6", "INC 6");
vidrioMap.set("8", "INC 8");
vidrioMap.set("INC4", "INC 4");
vidrioMap.set("INC5", "INC 5");
vidrioMap.set("INC6", "INC 6");
vidrioMap.set("INC8", "INC 8");
vidrioMap.set("VS4SIMPLE", "INC 4");
vidrioMap.set("VS5SIMPLE", "INC 5");
vidrioMap.set("VS6SIMPLE", "INC 6");
vidrioMap.set("VS8SIMPLE", "INC 8");
vidrioMap.set("4SATEN", "SATEN 4");
vidrioMap.set("SATEN4", "SATEN 4");
vidrioMap.set("SAT4", "SATEN 4");
vidrioMap.set("SEMILLA4", "SEMILLA 4");
vidrioMap.set("4SEMILLA", "SEMILLA 4");
vidrioMap.set("6LAM", "LAM 6");
vidrioMap.set("8LAM", "LAM 8");
vidrioMap.set("10LAM", "LAM 10");
vidrioMap.set("LAM6", "LAM 6");
vidrioMap.set("LAM8", "LAM 8");
vidrioMap.set("LAM10", "LAM 10");
vidrioMap.set("LAMACU6", "LAM ACU6");
vidrioMap.set("LAMACU8", "LAM ACU8");

// get relevant elements
const input_textarea = document.querySelector("#input_textarea");
const input_button = document.querySelector("#input_button");
const output_textarea = document.querySelector("#output_textarea");
const output_button = document.querySelector("#output_button");
const clear_button = document.querySelector("#clear_button");
const mode_selector = document.querySelector("#mode_selector");
const output_table = document.querySelector("#output_table");

// Split lines utility functions
const splitOnChar = (input, char) => input.split(char);
const splitOnTab = (input) => splitOnChar(input, "\t");
const splitOnSlash = (input) => splitOnChar(input, "/");
const splitOnNewLine = (input) => splitOnChar(input, "\n");

// text normalization
const normalizeString = (str) => {
  if (!isUsefullValue(str)) {
    return "";
  }
  return str
    .toUpperCase() // forces uppercase
    .normalize("NFD") // splits characters with unicode modifiers (tildes)
    .replace(/[\u0300-\u036f]/g, "") // removes unicode modifiers
    .replace(/[\., ]/g, ""); // removes misc characters
  // .replace(/(.)\1+/g, "$1") // removes consecutive duplicates (breaks semilla)
};

// transforms a string number like 1.000,5 to 1000.5
const excelString2Number = (string) => {
  return Math.round(string.replace(".", "").replace(",", "."));
};

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

// helper functions
const findSeparador = (input) => {
  let str = normalizeString(input);
  let separador = separadorMap.get(str);
  if (separador === undefined) {
    return { medida: "", color: "" };
  } else {
    return separador;
  }
};

const findVidrio = (input) => {
  let str = normalizeString(input);
  let vidrio = vidrioMap.get(str);
  return vidrio === undefined ? "" : vidrio;
};

// splits composicion line (ex: "4/10/4 SATEN")
const parseComposicionLine = (line) => {
  const array = splitOnSlash(line);
  return {
    vidrio_1: findVidrio(array[0]),
    vidrio_2: findVidrio(array[2]),
    separador_1: findSeparador(array[1]),
  };
};

// splits full 'pedido' line
const parsePosicionLine = (line) => {
  const array = splitOnTab(line);
  return {
    referencia: array[0],
    cantidad: excelString2Number(array[7]),
    ancho: excelString2Number(array[9]),
    alto: excelString2Number(array[11]),
    composicion: parseComposicionLine(array[4]),
  };
};

// Campos de la planilla "Carga Masiva"
// [0] Cantidad
// [1] Ancho (mm)
// [2] Alto (mm)
// [3] Vidrio 1
// [4] Vidrio 2
// [5] Vidrio 3
// [6] Separador 1
// [7] Color separador 1
// [8] Separador 2
// [9] Color separador 2
// [10] Forma
// [11] Palillo
// [12] Cantidad verticales
// [13] Cantidad horizontal
// [14] Referencia

const writePedido = (pedido) => {
  const output = [];
  output[0] = pedido.cantidad;
  output[1] = pedido.ancho;
  output[2] = pedido.alto;
  output[3] = pedido.composicion.vidrio_1;
  output[4] = pedido.composicion.vidrio_2;
  output[5] = pedido.composicion.vidrio_3;
  output[6] = pedido.composicion.separador_1.medida;
  output[7] = pedido.composicion.separador_1.color;
  // output[8] = pedido.composicion.separador_2?.medida;
  // output[9] = pedido.composicion.separador_2?.color;
  output[10] = pedido.forma ? "F" : "";
  // output[11] = pedido.palillo;
  // output[12] = pedido.palillo?.verticales;
  // output[13] = pedido.palillo?.horizontales;
  output[14] = pedido.referencia;

  return output.join("\t");
};

const writeTableRow = (pedido) => {
  const tr = document.createElement("tr");

  const tdArr = [
    pedido.cantidad,
    pedido.ancho,
    pedido.alto,
    pedido.composicion.vidrio_1,
    pedido.composicion.vidrio_2,
    pedido.composicion.separador_1.medida,
    pedido.composicion.separador_1.color,
    pedido.forma ? "F" : "",
    pedido.referencia,
  ].map((data) => {
    const td = document.createElement("td");
    td.innerText = data;
    return td;
  });

  for (const td of tdArr) {
    tr.appendChild(td);
  }

  return tr;
};

const translateRenovatekInput1 = () => {
  const input = input_textarea.value
    .split("\n")
    .map(splitOnTab)
    .filter((array) => array[4] !== "")
    .filter((array) => array[4] !== undefined);

  // [0] referencia
  // [4] composicion (5/10/5)
  // [7] cantidad
  // [9] ancho
  // [11] alto

  const pedidos = input.map((array) => {
    return {
      referencia: array[0],
      cantidad: excelString2Number(array[7]),
      ancho: excelString2Number(array[9]),
      alto: excelString2Number(array[11]),
      composicion: parseComposicionLine(array[4]),
    };
  });

  // merge descriptions
  let oddLines = pedidos.filter((_, index) => index % 2 === 0);
  let evenLines = pedidos.filter((_, index) => index % 2 !== 0);
  oddLines.map((element, index) => {
    element.referencia = `${element.referencia} ${evenLines[index].referencia}`;
  });

  return oddLines;
};

const translateRenovatekInput2 = () => {
  const input = input_textarea.value
    .split("\n")
    .map(splitOnTab)
    .filter((array) => array[2] !== "")
    .filter((array) => array[0] !== "");

  // [0] referencia
  // [1] composicion (5/10/5)
  // [2] cant1
  // [3] ancho (929,00)
  // [4] alto (2.114,00)

  const pedidos = input.map((array) => {
    return {
      referencia: array[0],
      cantidad: excelString2Number(array[2]),
      ancho: excelString2Number(array[3]),
      alto: excelString2Number(array[4]),
      composicion: parseComposicionLine(array[1]),
    };
  });

  return pedidos;
};

const translateBastroInput = () => {
  const input = input_textarea.value
    .split("\n")
    .map(splitOnTab)
    .filter((array) => array[0] !== "")
    .filter((array) => array[0] !== "Item");

  // [0] Item
  // [1] Referencia Item
  // [2] Cantidad
  // [3] Ancho
  // [4] Alto
  // [5] Cristal 1
  // [6] Cristal 2
  // [7] Separador

  const pedidos = input.map((arr) => {
    arr[3] = normalizeString(arr[3]);
    return {
      referencia: arr[3] === "FORMA" ? `FORMA ${arr[1]}` : arr[1],
      cantidad: excelString2Number(arr[2]),
      ancho: arr[3] === "FORMA" ? 0 : excelString2Number(arr[3]),
      alto: excelString2Number(arr[4]),
      composicion: {
        vidrio_1: findVidrio(arr[5]),
        vidrio_2: findVidrio(arr[6]),
        separador_1: findSeparador(arr[7]),
      },
      forma: arr[3] === "FORMA",
    };
  });

  return pedidos;
};

input_button.addEventListener("click", (e) => {
  e.preventDefault();
  let pedidos = [];
  switch (mode_selector.value) {
    case "rtk1":
      pedidos = translateRenovatekInput1();
      break;
    case "rtk2":
      pedidos = translateRenovatekInput2();
      break;
    case "bst":
      pedidos = translateBastroInput();
      break;
    default:
      console.error("not implemented");
      break;
  }
  output_textarea.value = pedidos.map(writePedido).join("\n");

  output_table.innerText = "";
  for (const pedido of pedidos) {
    output_table.appendChild(writeTableRow(pedido));
  }
});

output_button.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(output_textarea.value);
});

clear_button.addEventListener("click", (event) => {
  event.preventDefault();
  input_textarea.value = "";
  output_textarea.value = "";
  output_table.innerText = "";
  mode_selector.value = "";
});
