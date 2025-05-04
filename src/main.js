import { translateRenovatekInput1 } from "./translators/renovatek1.mjs";
import { translateRenovatekInput2 } from "./translators/renovatek2.mjs";
import { translateRenovatekInput3 } from "./translators/renovatek3.mjs";
import { translateBastroInput } from "./translators/bastro.mjs";
import { writePedido } from "./renderer/writer.mjs";
import { writeTableRow } from "./renderer/table.mjs";

const input_textarea = document.querySelector("#input_textarea");
const input_button = document.querySelector("#input_button");
const output_textarea = document.querySelector("#output_textarea");
const output_button = document.querySelector("#output_button");
const clear_button = document.querySelector("#clear_button");
const mode_selector = document.querySelector("#mode_selector");
const output_table = document.querySelector("#output_table");

input_button.addEventListener("click", (e) => {
  e.preventDefault();
  let pedidos = [];
  const input = input_textarea.value;

  switch (mode_selector.value) {
    case "rtk_nar":
      pedidos = translateRenovatekInput1(input);
      break;
    case "rtk_azu":
      pedidos = translateRenovatekInput3(input);
      break;
    case "bst":
      pedidos = translateBastroInput(input);
      break;
    default:
      console.error("not implemented");
      return;
  }

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
