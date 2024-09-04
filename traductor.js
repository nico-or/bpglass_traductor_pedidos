"use strict";

// Info separadores
const separadoresData = [
  {
    medida: "Sep 5,5",
    color: "BR OSC",
    alias: ["6", "SEP6BRONCE"],
  },
  {
    medida: "Sep 7,5",
    color: "BR OSC",
    alias: ["8", "SEP8BRONCE"],
  },
  {
    medida: "Sep 9,5",
    color: "BR OSC",
    alias: ["10", "SEP10BRONCE", "SEP10SUPERSPACER"],
  },
  {
    medida: "Sep 11,5",
    color: "BR OSC",
    alias: ["12", "SEP12BRONCE", "SEP12SUPERSPACER"],
  },
  {
    medida: "Sep 14,5",
    color: "BR OSC",
    alias: ["14", "15", "SEP15BRONCE"],
  },
  {
    medida: "Sep 16,5",
    color: "BR OSC",
    alias: ["SEP17BRONCE"],
  },
  {
    medida: "Sep 19,5",
    color: "BR OSC",
    alias: ["19", "20", "SEP19BRONCE", "SEP20BRONCE"],
  },
  {
    medida: "Sep 5,5",
    color: "MATE",
    alias: ["SEP6MATE"],
  },
  {
    medida: "Sep 7,5",
    color: "MATE",
    alias: ["SEP8MATE"],
  },
  {
    medida: "Sep 9,5",
    color: "MATE",
    alias: ["SEP10MATE"],
  },
  {
    medida: "Sep 11,5",
    color: "MATE",
    alias: ["SEP12MATE"],
  },
  {
    medida: "Sep 14,5",
    color: "MATE",
    alias: ["SEP15MATE"],
  },
  {
    medida: "Sep 19,5",
    color: "MATE",
    alias: ["SEP19MATE", "SEP20MATE"],
  },
];

// Info cristales
const cristalesData = [
  {
    cargaMasiva: "INC 3",
    alias: ["3", "INC3", "VS3SIMPLE", "VS3", "FLT3", "FLOAT3"],
  },
  {
    cargaMasiva: "INC 4",
    alias: ["4", "INC4", "VS4SIMPLE", "VS4", "FLT4", "FLOAT4"],
  },
  {
    cargaMasiva: "INC 5",
    alias: ["5", "INC5", "VS5SIMPLE", "VS5", "FLT5", "FLOAT5"],
  },
  {
    cargaMasiva: "INC 6",
    alias: ["6", "INC6", "VS6SIMPLE", "VS6", "FLT6", "FLOAT6"],
  },
  {
    cargaMasiva: "INC 8",
    alias: ["8", "INC8", "VS8SIMPLE", "VS8", "FLT8", "FLOAT8"],
  },
  {
    cargaMasiva: "SATEN 4",
    alias: ["4SATEN", "SATEN4", "SAT4", "VS4SATEN"],
  },
  {
    cargaMasiva: "SEMILLA 4",
    alias: ["SEMILLA4", "4SEMILLA", "SEM4"],
  },
  {
    cargaMasiva: "LAM 6",
    alias: ["6LAM", "LAM6", "VS6LAMINADO"],
  },
  {
    cargaMasiva: "LAM 8",
    alias: ["8LAM", "LAM8"],
  },
  {
    cargaMasiva: "LAM 10",
    alias: ["10LAM", "LAM10"],
  },
  {
    cargaMasiva: "LAM 12",
    alias: ["12LAM", "LAM12"],
  },
  {
    cargaMasiva: "LAM ACU6",
    alias: ["LAMACU6", "LAM6ACU"],
  },
  {
    cargaMasiva: "LAM ACU8",
    alias: ["LAMACU8", "LAM8ACU"],
  },
];

// Build alias hash maps
function reverseAlias(list) {
  return list.reduce((acc, e) => {
    e.alias.forEach((alias) => {
      acc[alias] = e;
    });
    return acc;
  }, {});
}

const cristalMap = reverseAlias(cristalesData);
const separadorMap = reverseAlias(separadoresData);

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
  const nullSeparador = {
    medida: "",
    color: "",
    alias: [],
  };
  return separadorMap[str] || nullSeparador;
};

const findVidrio = (input) => {
  let str = normalizeString(input);
  let vidrio = cristalMap[str];
  return vidrio?.cargaMasiva || "";
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

const translateRenovatekInput3 = () => {
  const input = input_textarea.value
    .split("\n")
    .filter((line) => line !== "")
    .map(splitOnTab)
    .filter((array) => array[3] !== "");

  // [0] Referencia Ítem
  // [1] Cantidad
  // [2] Ancho (mm)
  // [3] Largo (mm)
  // [4] Cristal 1
  // [5] Cristal 2
  // [6] Separador
  // [7] Color Sep

  const pedidos = input.map((array) => {
    return {
      referencia: array[0],
      cantidad: excelString2Number(array[1]),
      ancho: excelString2Number(array[2]),
      alto: excelString2Number(array[3]),
      composicion: {
        vidrio_1: array[4],
        vidrio_2: array[5],
        separador_1: {
          medida: array[6],
          color: array[7],
        },
      },
    };
  });

  return pedidos;
};

const translateBastroInput = () => {
  const input = input_textarea.value
    .split("\n")
    .filter((line) => line !== "")
    .map(splitOnTab)
    .filter((array) => array[3] !== "")
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
    case "rtk_nar":
      pedidos = translateRenovatekInput1();
      break;
    case "rtk_azu":
      pedidos = translateRenovatekInput3();
      break;
    case "bst":
      pedidos = translateBastroInput();
      break;
    default:
      console.error("not implemented");
      break;
  }

  const filtered_pedidos = pedidos.filter((pedido) => !isNaN(pedido.cantidad));

  output_textarea.value = filtered_pedidos.map(writePedido).join("\n");

  output_table.innerText = "";
  for (const pedido of filtered_pedidos) {
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
