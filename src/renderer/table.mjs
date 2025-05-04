export function writeTableRow(pedido) {
  const tr = document.createElement("tr");

  [
    pedido.cantidad,
    pedido.ancho,
    pedido.alto,
    pedido.composicion.vidrio_1,
    pedido.composicion.vidrio_2,
    pedido.composicion.separador_1.medida,
    pedido.composicion.separador_1.color,
    pedido.forma ? "F" : "",
    pedido.referencia,
  ].forEach((text) => {
    const td = document.createElement("td");
    td.innerText = text;
    tr.appendChild(td);
  });

  return tr;
}
