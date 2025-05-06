import {
  aliasIncoloro,
  aliasLaminado,
  aliasLaminadoAcustico,
  aliasSaten,
  aliasBronce,
  aliasLowe,
} from "./generator.mjs";

export const cristalesData = [
  {
    cargaMasiva: "INC 3",
    alias: aliasIncoloro(3),
  },
  {
    cargaMasiva: "INC 4",
    alias: aliasIncoloro(4),
  },
  {
    cargaMasiva: "INC 5",
    alias: aliasIncoloro(5),
  },
  {
    cargaMasiva: "INC 6",
    alias: aliasIncoloro(6),
  },
  {
    cargaMasiva: "INC 8",
    alias: aliasIncoloro(8),
  },
  {
    cargaMasiva: "SATEN 4",
    alias: aliasSaten(4),
  },
  {
    cargaMasiva: "SEMILLA 4",
    alias: ["SEMILLA4", "4SEMILLA", "SEM4", "4SEM"],
  },
  {
    cargaMasiva: "LAM 6",
    alias: aliasLaminado(6),
  },
  {
    cargaMasiva: "LAM 8",
    alias: aliasLaminado(8),
  },
  {
    cargaMasiva: "LAM 10",
    alias: aliasLaminado(10),
  },
  {
    cargaMasiva: "LAM 12",
    alias: aliasLaminado(12),
  },
  {
    cargaMasiva: "LAM ACU6",
    alias: aliasLaminadoAcustico(6),
  },
  {
    cargaMasiva: "LAM ACU8",
    alias: aliasLaminadoAcustico(8),
  },
  {
    cargaMasiva: "LAM ACU10",
    alias: aliasLaminadoAcustico(10),
  },
  {
    cargaMasiva: "LAM ACU12",
    alias: aliasLaminadoAcustico(12),
  },
  {
    cargaMasiva: "BR 4",
    alias: aliasBronce(4),
  },
  {
    cargaMasiva: "BR 5",
    alias: aliasBronce(5),
  },
  {
    cargaMasiva: "BR 6",
    alias: aliasBronce(6),
  },
  {
    cargaMasiva: "BR 8",
    alias: aliasBronce(8),
  },
  {
    cargaMasiva: "BR 10",
    alias: aliasBronce(10),
  },
  {
    cargaMasiva: "LOWE 3",
    alias: aliasLowe(3),
  },
  {
    cargaMasiva: "LOWE 4",
    alias: aliasLowe(4),
  },
  {
    cargaMasiva: "LOWE 5",
    alias: aliasLowe(5),
  },
  {
    cargaMasiva: "LOWE 6",
    alias: aliasLowe(6),
  },
];
