import { normalizeString } from "./normalize.mjs";
import { reverseAlias } from "./alias.mjs";
import { cristalesData } from "../data/cristales.mjs";
import { separadoresData } from "../data/separadores.mjs";

const cristalMap = reverseAlias(cristalesData);
const separadorMap = reverseAlias(separadoresData);

export function findVidrio(input) {
  const norm = normalizeString(input);
  return cristalMap[norm]?.cargaMasiva;
}

export function findSeparador(input) {
  const norm = normalizeString(input);
  return separadorMap[norm];
}

// splits composicion line (ex: "4/10/4 SATEN")
export function parseComposicionLine(line) {
  const [v1, sep, v2] = line.split("/");
  return {
    vidrio_1: findVidrio(v1),
    vidrio_2: findVidrio(v2),
    separador_1: findSeparador(sep),
  };
}
