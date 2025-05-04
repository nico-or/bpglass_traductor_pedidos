// Output column headers for the "Carga Masiva" sheet:
// [0] Cantidad
// [1] Ancho (mm)
// [2] Alto (mm)
// [3] Vidrio 1
// [4] Vidrio 2
// [5] Vidrio 3
// [6] Separador 1
// [7] Color separador 1
// [8] Separador 2
// [9] Color separador 2
// [10] Forma
// [11] Palillo
// [12] Cantidad verticales
// [13] Cantidad horizontal
// [14] Referencia

export function writePedido(pedido) {
  return [
    pedido.cantidad,
    pedido.ancho,
    pedido.alto,
    pedido.composicion.vidrio_1,
    pedido.composicion.vidrio_2,
    pedido.composicion.vidrio_3,
    pedido.composicion.separador_1?.medida,
    pedido.composicion.separador_1?.color,
    pedido.composicion.separador_2?.medida,
    pedido.composicion.separador_2?.color,
    pedido.forma ? "F" : "",
    "", // pedido.palillo,
    "", // pedido.palillo?.verticales;
    "", // pedido.palillo?.horizontales;
    pedido.referencia,
  ].join("\t");
}
