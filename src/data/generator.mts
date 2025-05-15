export function aliasIncoloro(number: number): string[] {
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

export function aliasLaminado(number: number): string[] {
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

export function aliasLaminadoAcustico(number: number): string[] {
  return [
    `LAM${number}ACU`,
    `LAMACU${number}`,
    `${number}LAMACU`,
    `LAMINADOACU${number}`,
    `${number}LAMINADOACU`,
    `LAMINADOACUSTICO${number}`,
    `${number}LAMINADOACUSTICO`,
  ].flat();
}

export function aliasSaten(number: number): string[] {
  return [
    `SATEN${number}`,
    `${number}SATEN`,
    `SAT${number}`,
    `${number}SAT`,
    `VS${number}SAT`,
    `VS${number}SATEN`,
  ].flat();
}

export function aliasBronce(number: number): string[] {
  return [
    `BR${number}`,
    `${number}BR`,
    `BRC${number}`,
    `${number}BRC`,
    `BRONCE${number}`,
    `${number}BRONCE`,
  ].flat();
}

export function aliasLowe(number: number): string[] {
  return [`LOWE${number}`, `${number}LOWE`].flat();
}
