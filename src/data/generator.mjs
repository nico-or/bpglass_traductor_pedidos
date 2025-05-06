export function aliasIncoloro(number) {
  return [
    number.toString(),
    `INC${number}`,
    `${number}INC`,
    `INCOLORO${number}`,
    `${number}INCOLORO`,
    `FLT${number}`,
    `${number}FLT`,
    `FLOAT${number}`,
    `${number}FLOAT`,
    `VS${number}SIMPLE`,
    `VS${number}`,
  ].flat();
}

export function aliasLaminado(number) {
  return [
    `LAM${number}`,
    `${number}LAM`,
    `LAM${number}SEG`,
    `LAM${number}SEGURIDAD`,
    `LAMSEG${number}`,
    `${number}LAMSEG`,
    `LAMINADO${number}`,
    `${number}LAMINADO`,
    `LAMINADOSEG${number}`,
    `${number}LAMINADOSEG`,
    `LAMINADOSEGURIDAD${number}`,
    `${number}LAMINADOSEGURIDAD`,
    `VS${number}LAMINADO`,
  ].flat();
}

export function aliasLaminadoAcustico(number) {
  return [
    `LAM${number}ACU`,
    `LAMACU${number}`,
    `${number}LAMACU`,
    `LAMINADOACU${number}`,
    `${number}LAMINADOACU`,
    `LAMINADOACU${number}`,
    `${number}LAMINADOACU`,
    `LAMINADOACUSTICO${number}`,
    `${number}LAMINADOACUSTICO`,
  ].flat();
}

export function aliasSaten(number) {
  return [
    `SATEN${number}`,
    `${number}SATEN`,
    `SAT${number}`,
    `${number}SAT`,
    `VS${number}SAT`,
    `VS${number}SATEN`,
  ].flat();
}
