import bastro from "./bastro/default.mjs";
import naranjo from "./renovatek/naranjo.mjs";
import azul from "./renovatek/azul.mjs";

// The keys need to match the value of the mode_selector in the HTML file.
export const translators = {
  bst: bastro,
  rtk_nar: naranjo,
  rtk_azu: azul,
};
