import { Composicion } from "./composicion";

export type Posicion = {
  referencia: string;
  cantidad: number;
  ancho: number | undefined; // TODO: change undefined for null
  alto: number | undefined; // TODO: change undefined for null
  composicion: Composicion;
  forma: boolean;
};
