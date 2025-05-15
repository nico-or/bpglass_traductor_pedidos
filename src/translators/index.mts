import bst_default from "./bastro/default.mjs";
import rtk_naranjo from "./renovatek/naranjo.mjs";
import { spreadsheetString } from "../types/inputString";
import { Posicion } from "../types/posicion";

// The keys need to match the value of the mode_selector in the HTML file.
export const translators: Record<
  string,
  (inputText: spreadsheetString) => Posicion[]
> = {
  bst_default: bst_default,
  rtk_naranjo: rtk_naranjo,
};
