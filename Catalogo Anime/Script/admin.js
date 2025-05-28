// Mostrar modal de inserción de anime
function mostrarModal() {
    document.getElementById("modalAnime").style.display = "block";
    document.getElementById("formInsertarAnime").reset();
    document.getElementById("btnInsertar").style.display = "inline-block";
    document.getElementById("btnModificar").style.display = "none";
}

// Cerrar el modal
function cerrarModal() {
    document.getElementById("modalAnime").style.display = "none";
    document.getElementById("formInsertarAnime").reset();
}

// Insertar un nuevo anime
async function insertarAnime() {
    // Reemplazar confirm con un modal personalizado si es necesario
    // Para este ejemplo, se mantiene confirm por simplicidad, pero se recomienda cambiarlo
    if (!confirm("¿Estás seguro de que deseas insetar este anime?")) {
        return;
    }
    const formData = new URLSearchParams();
    formData.append("accion", "insertar");
    formData.append("titulo", document.getElementById("titulo").value);
    formData.append("calificacion", document.getElementById("calificacion").value);
    formData.append("ano_lanzamiento", document.getElementById("ano_lanzamiento").value);
    formData.append("estudio", document.getElementById("estudio").value);
    formData.append("sinopsis", document.getElementById("sinopsis").value);
    formData.append("tiene_manga", document.getElementById("tiene_manga").value);
    formData.append("url_imagen", document.getElementById("url_imagen").value);

    try {
        const response = await fetch("http://localhost/Catalogo_Anime/gestionadmin.php", {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        const data = await response.json();
        // Reemplazar alert con un modal personalizado si es necesario
        alert(data.message || "Anime insertado con éxito");
    } catch (error) {
        console.error("Error en la inserción:", error);
        // Reemplazar alert con un modal personalizado si es necesario
        alert("Error al insertar el anime");
    }

    cerrarModal();
    cargarAnimes();
}

// Mostrar modal de edición
function mostrarModalEdicion(button) {
    document.getElementById("modalAnime").style.display = "block";

    // Obtener los datos del anime desde el botón
    document.getElementById("titulo").value = button.getAttribute("data-titulo");
    document.getElementById("calificacion").value = button.getAttribute("data-calificacion");
    document.getElementById("ano_lanzamiento").value = button.getAttribute("data-ano_lanzamiento");
    document.getElementById("estudio").value = button.getAttribute("data-estudio");
    document.getElementById("sinopsis").value = button.getAttribute("data-sinopsis");
    document.getElementById("tiene_manga").value = button.getAttribute("data-tiene_manga");
    document.getElementById("url_imagen").value = button.getAttribute("data-url_imagen");

    // Guardar el ID en un atributo del formulario para usarlo al modificar
    document.getElementById("formInsertarAnime").setAttribute("data-id", button.getAttribute("data-id"));

    // Mostrar botón de modificar y ocultar el de insertar
    document.getElementById("btnModificar").style.display = "inline-block";
    document.getElementById("btnInsertar").style.display = "none";
}

// Modificar un anime
async function modificarAnime() {
    // Reemplazar confirm con un modal personalizado si es necesario
    if (!confirm("¿Estás seguro de que deseas modificar este anime?")) {
        return;
    }

    const formData = new URLSearchParams();
    formData.append("accion", "modificar");
    formData.append("id", document.getElementById("formInsertarAnime").getAttribute("data-id"));
    formData.append("titulo", document.getElementById("titulo").value);
    formData.append("calificacion", document.getElementById("calificacion").value);
    formData.append("ano_lanzamiento", document.getElementById("ano_lanzamiento").value);
    formData.append("estudio", document.getElementById("estudio").value);
    formData.append("sinopsis", document.getElementById("sinopsis").value);
    formData.append("tiene_manga", document.getElementById("tiene_manga").value);
    formData.append("url_imagen", document.getElementById("url_imagen").value);

    try {
        const response = await fetch("http://localhost/Catalogo_Anime/gestionadmin.php", {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        const data = await response.json();
        // Reemplazar alert con un modal personalizado si es necesario
        alert(data.message || "Anime modificado con éxito");
    } catch (error) {
        console.error("Error al modificar el anime:", error);
        // Reemplazar alert con un modal personalizado si es necesario
        alert("Error al modificar el anime");
    }

    cerrarModal();
    cargarAnimes();
}

// Eliminar un anime
async function eliminarAnime(titulo) {
    // Reemplazar confirm con un modal personalizado si es necesario
    if (!confirm(`¿Estás seguro de que deseas eliminar "${titulo}"?`)) {
        return;
    }

    const formData = new URLSearchParams();
    formData.append("accion", "eliminar");
    formData.append("titulo", titulo);

    try {
        const response = await fetch("http://localhost/Catalogo_Anime/gestionadmin.php", {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        const data = await response.json();
        // Reemplazar alert con un modal personalizado si es necesario
        alert(data.message || "Anime eliminado con éxito");

        // Recargar la lista de animes después de eliminar
        cargarAnimes();
    } catch (error) {
        console.error("Error al eliminar el anime:", error);
        // Reemplazar alert con un modal personalizado si es necesario
        alert("Error al eliminar el anime");
    }
}

// Mostrar configuración del sistema
document.addEventListener("DOMContentLoaded", function () {
    cargarConfiguracion();
});

// Mostrar ventana de configuración
function mostrarConfiguracion() {
    document.getElementById("modalConfiguracion").style.display = "block";
}

// Cerrar ventana de configuración
function cerrarConfiguracion() {
    document.getElementById("modalConfiguracion").style.display = "none";
}

// Aplicar configuración seleccionada
function aplicarConfiguracion() {
    const colorColumnas = document.getElementById("colorColumnas").value;
    const tipoFuente = document.getElementById("tipoFuente").value;

    // Aplicar color de las columnas
    aplicarColorColumnas(colorColumnas);

    // Aplicar tipo de fuente
    document.body.style.fontFamily = tipoFuente;

    // Guardar en LocalStorage
    localStorage.setItem("colorColumnas", colorColumnas);
    localStorage.setItem("tipoFuente", tipoFuente);

    cerrarConfiguracion();
}

// Cargar configuración guardada
function cargarConfiguracion() {
    const colorColumnas = localStorage.getItem("colorColumnas") || "naranja";
    const tipoFuente = localStorage.getItem("tipoFuente") || "Arial, sans-serif";

    // Aplicar configuraciones guardadas
    aplicarColorColumnas(colorColumnas);
    document.body.style.fontFamily = tipoFuente;

    // Restaurar valores en los select e inputs
    document.getElementById("colorColumnas").value = colorColumnas;
    document.getElementById("tipoFuente").value = tipoFuente;
}

// Cambiar el color de las columnas y botones
function aplicarColorColumnas(color) {
    const columnas = document.querySelectorAll("th"); // Columnas de la tabla
    const botonesAccion = document.querySelectorAll(".action-button"); // Botones de Modificar y Eliminar
    const botonesExtra = document.querySelectorAll(".extra-button, a"); // Botones adicionales y enlaces

    let nuevoColor;
    switch (color) {
        case "azul": nuevoColor = "#2196F3"; break;
        case "verde": nuevoColor = "#4CAF50"; break;
        case "morado": nuevoColor = "#9C27B0"; break;
        default: nuevoColor = "#FF5733"; // Naranja predeterminado
    }

    // Cambiar color de las columnas
    columnas.forEach(th => th.style.backgroundColor = nuevoColor);

    // Cambiar color de los botones de acción (Modificar y Eliminar)
    botonesAccion.forEach(btn => {
        btn.style.backgroundColor = nuevoColor;
        btn.style.borderColor = nuevoColor;
        btn.style.color = "#fff"; // Asegurar contraste con el fondo
    });


    // Cambiar color de los botones adicionales y enlaces
    botonesExtra.forEach(btn => {
        btn.style.backgroundColor = nuevoColor;
        btn.style.borderColor = nuevoColor;
        btn.style.color = "#fff";
        btn.style.padding = "10px 15px"; // Espaciado similar a un botón
        btn.style.borderRadius = "5px"; // Bordes redondeados
        btn.style.textDecoration = "none"; // Quitar subrayado
        btn.style.display = "inline-block"; // Evita que se aplique solo al texto
    });
}

  function filtrarAnimes() {
            let input = document.getElementById("busqueda").value.toLowerCase();
            let table = document.getElementById("animeTable");
            let tr = table.getElementsByTagName("tr");

            for (let i = 1; i < tr.length; i++) {
                let td = tr[i].getElementsByTagName("td")[2];
                if (td) {
                    let texto = td.textContent || td.innerText;
                    tr[i].style.display = texto.toLowerCase().includes(input) ? "" : "none";
                }
            }
        }

// Cargar los animes al inicio
async function cargarAnimes() {
    try {
        const response = await fetch("http://localhost/Catalogo_Anime/obtenerAnime.php");
        const animes = await response.json();
        const tableBody = document.querySelector("#animeTable tbody");

        tableBody.innerHTML = animes.map(anime =>
            `<tr>
                <td>${anime.id}</td>
                <td><img src="${anime.url_imagen}" alt="${anime.titulo}"></td>
                <td>${anime.titulo}</td>
                <td>${anime.calificacion}</td>
                <td>${anime.ano_lanzamiento}</td>
                <td>${anime.estudio}</td>
                <td class="table-cell-container">
                    <div class="truncate-text">
                        ${anime.sinopsis}
                    </div>
                </td>
                <td>${anime.tiene_manga ? 'Sí' : 'No'}</td>
                <td><button class="action-button" data-id="${anime.id}" data-titulo="${anime.titulo}" data-calificacion="${anime.calificacion}" data-ano_lanzamiento="${anime.ano_lanzamiento}" data-estudio="${anime.estudio}" data-sinopsis="${anime.sinopsis}" data-tiene_manga="${anime.tiene_manga}" data-url_imagen="${anime.url_imagen}" onclick="mostrarModalEdicion(this)">✏️</button></td>
                <td><button class="action-button" onclick="eliminarAnime('${anime.titulo}')">❌</button></td>
            </tr>`
        ).join("");

        // Asegurar que los botones mantengan el color
        const colorColumnas = localStorage.getItem("colorColumnas") || "naranja";
        aplicarColorColumnas(colorColumnas);
    } catch (error) {
        console.error("Error al cargar los animes:", error);
    }
}

// Cargar los animes al cargar la página
window.onload = cargarAnimes;
