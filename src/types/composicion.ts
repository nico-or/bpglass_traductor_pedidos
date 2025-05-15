import { Cristal } from "./cristal";
import { Separador } from "./separador";

export type Composicion = {
  vidrio_1: Cristal | undefined; // TODO: change undefined for null
  vidrio_2: Cristal | undefined; // TODO: change undefined for null
  vidrio_3: Cristal | undefined; // TODO: change undefined for null
  separador_1: Separador | undefined; // TODO: change undefined for null
  separador_2: Separador | undefined; // TODO: change undefined for null
};
