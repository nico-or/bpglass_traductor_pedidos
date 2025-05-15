import { translators } from "./translators/index.mjs";
import { writePedido } from "./renderer/writer.mjs";
import { writeTableRow } from "./renderer/table.mjs";
import { spreadsheetString } from "./types/inputString";

const input_textarea = document.querySelector(
  "#input_textarea"
) as HTMLTextAreaElement;
const input_button = document.querySelector(
  "#input_button"
) as HTMLButtonElement;
const output_textarea = document.querySelector(
  "#output_textarea"
) as HTMLTextAreaElement;
const output_button = document.querySelector(
  "#output_button"
) as HTMLButtonElement;
const clear_button = document.querySelector(
  "#clear_button"
) as HTMLButtonElement;
const mode_selector = document.querySelector(
  "#mode_selector"
) as HTMLSelectElement;
const output_table = document.querySelector(
  "#output_table"
) as HTMLTableElement;

input_button.addEventListener("click", (e) => {
  e.preventDefault();
  const input = input_textarea.value as spreadsheetString;
  const mode = mode_selector.value;
  const translator = translators[mode];

  if (!translator) {
    console.error("No translator found for mode:", mode);
    return;
  }

  const pedidos = translator(input);

  const filtered = pedidos.filter((p) => !isNaN(p.cantidad));

  output_textarea.value = filtered.map(writePedido).join("\n");
  output_table.innerText = "";
  filtered.forEach((p) => output_table.appendChild(writeTableRow(p)));

  if (typeof umami !== "undefined") {
    umami.track("translate_action", {
      position_count: filtered.length,
      mode: mode_selector.value,
    });
  } else {
    console.error("umami is not defined.");
  }
});

output_button.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.clipboard.writeText(output_textarea.value);
});

clear_button.addEventListener("click", (e) => {
  e.preventDefault();
  input_textarea.value = "";
  output_textarea.value = "";
  output_table.innerText = "";
  mode_selector.value = "";
});
