document.getElementById("seleccionar").addEventListener("click", () => {
  const categoriaSeleccionada = document.getElementById("categoria").value;

  // Cargar y procesar XML
  fetch("productos.xml")
    .then(response => response.text())
    .then(data => procesarXML(data, categoriaSeleccionada));

  // Cargar y procesar JSON
  fetch("productos.json")
    .then(response => response.json())
    .then(data => procesarJSON(data, categoriaSeleccionada));
});

function procesarXML(xmlData, categoria) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlData, "application/xml");
  const productos = xmlDoc.getElementsByTagName("producto");
  let resultado = "<h3>XML:</h3><ul>";

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].getAttribute("categoria") === categoria) {
      const nombre = productos[i].getElementsByTagName("nombre")[0].textContent;
      const precio = productos[i].getElementsByTagName("precio")[0].textContent;
      const caducidad = productos[i].getElementsByTagName("caducidad")[0]
        ? productos[i].getElementsByTagName("caducidad")[0].textContent
        : "N/A";
      const peso = productos[i].getElementsByTagName("peso")[0]
        ? productos[i].getElementsByTagName("peso")[0].textContent + " kg"
        : productos[i].getElementsByTagName("volumen")[0].textContent + " L";
      resultado += `<li>${nombre} - ${peso} - ${precio} € - Caducidad: ${caducidad}</li>`;
    }
  }
  resultado += "</ul>";
  document.getElementById("resultado").innerHTML = resultado;
}

function procesarJSON(jsonData, categoria) {
  let resultado = "<h3>JSON:</h3><ul>";
  jsonData.forEach(producto => {
    if (producto.categoria === categoria) {
      const nombre = producto.nombre;
      const precio = producto.precio;
      const caducidad = producto.caducidad || "N/A";
      const peso = producto.peso ? producto.peso + " kg" : producto.volumen + " L";
      resultado += `<li>${nombre} - ${peso} - ${precio} € - Caducidad: ${caducidad}</li>`;
    }
  });
  resultado += "</ul>";
  document.getElementById("resultado").innerHTML += resultado;
}
