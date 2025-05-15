import { normalizeString } from "./normalize.mjs";
import { reverseAlias } from "./alias.mjs";
import { cristalesData } from "../data/cristales.mjs";
import { separadoresData } from "../data/separadores.mjs";
import { Cristal } from "../types/cristal";
import { Separador } from "../types/separador";
import { Composicion } from "../types/composicion";

const cristalMap = reverseAlias(cristalesData);
const separadorMap = reverseAlias(separadoresData);

// TODO: Refactor to return a Cristal object instead of a string
export function findVidrio(input: string): string {
  const norm = normalizeString(input);
  return cristalMap[norm]?.cargaMasiva;
}

export function findSeparador(input: string): Separador {
  const norm = normalizeString(input);
  return separadorMap[norm];
}

// splits composicion line (ex: "4/10/4 SATEN")
export function parseComposicionLine(line: string): Composicion {
  const [v1, sep1, v2, sep2, v3] = line.split("/");
  return {
    vidrio_1: findVidrio(v1),
    vidrio_2: findVidrio(v2),
    vidrio_3: findVidrio(v3),
    separador_1: findSeparador(sep1),
    separador_2: findSeparador(sep2),
  };
}
