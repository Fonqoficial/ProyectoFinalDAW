// Obtener correo del usuario de sessionStorage
const correoUsuario = sessionStorage.getItem("correoUsuario");
if (!correoUsuario) {
    window.location.href = "login.html";
} else {
    document.getElementById("correoUsuario").textContent = correoUsuario;
}

function irASolicitudes() {
    sessionStorage.setItem("correoUsuario", correoUsuario);
    window.location.href = "solicitudes.html";
}

function irAFavoritos() {
    sessionStorage.setItem("correoUsuario", correoUsuario);
    window.location.href = "favoritos.html";
}

function cerrarSesion() {
    sessionStorage.removeItem("correoUsuario");
    window.location.href = "login.html";
}

async function cargarAnimes() {
    const url = 'http://localhost/Catalogo_Anime/obtenerAnime.php';
    const urlFavoritos = `http://localhost/Catalogo_Anime/obtenerfavoritos.php?correo=${correoUsuario}`;

    try {
        // Obtener todos los animes y los favoritos del usuario
        const [animeResponse, favResponse] = await Promise.all([fetch(url), fetch(urlFavoritos)]);
        const animes = await animeResponse.json();
        const favoritos = await favResponse.json();

        // Convertimos la lista de favoritos a un Set para búsqueda rápida
        const favoritosSet = new Set(favoritos.favoritos.map(anime => anime.titulo));

        const tableBody = document.querySelector('#tabla_Anime tbody');
        tableBody.innerHTML = '';

        animes.forEach((anime) => {
            const isFavorito = favoritosSet.has(anime.titulo);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${anime.url_imagen}" alt="${anime.titulo}"></td>
                <td>${anime.titulo}</td>
                <td>${anime.calificacion}</td>
                <td>${anime.ano_lanzamiento}</td>
                <td>
                    <button class="show-more-btn">Mostrar más</button>
                </td>
                <td>
                    <button class="fav-btn ${isFavorito ? 'disabled-btn' : ''}" 
                            onclick="agregarAFavoritos('${anime.titulo}', this)"
                            ${isFavorito ? 'disabled' : ''}>
                        ${isFavorito ? '✅ Agregado' : '⭐ Agregar'}
                    </button>
                </td>
            `;

            const hiddenInfoRow = document.createElement('tr');
            hiddenInfoRow.classList.add('hidden-info');
            hiddenInfoRow.style.display = 'none';
            hiddenInfoRow.innerHTML = `
                <td colspan="6">
                    <div>
                        <p><strong>Sinopsis:</strong> ${anime.sinopsis}</p>
                        <p><strong>Estudio:</strong> ${anime.estudio}</p>
                        <p><strong>Tiene Manga:</strong> ${anime.tiene_manga == '1' ? 'Sí' : 'No'}</p>
                    </div>
                </td>
            `;

            // Evento para mostrar más información
            const showMoreBtn = row.querySelector('.show-more-btn');
            showMoreBtn.addEventListener('click', function () {
                hiddenInfoRow.style.display = hiddenInfoRow.style.display === 'none' ? 'table-row' : 'none';
                showMoreBtn.textContent = hiddenInfoRow.style.display === 'none' ? "Mostrar más" : "Mostrar menos";
            });

            tableBody.appendChild(row);
            tableBody.appendChild(hiddenInfoRow);
        });

    } catch (error) {
        console.error('Error al cargar los animes:', error);
    }
}

function mostrarMas(index) {
    const allHiddenRows = document.querySelectorAll('.hidden-info');
    allHiddenRows.forEach(row => row.style.display = 'none');

    const hiddenRow = document.querySelectorAll('.hidden-info')[index];
    hiddenRow.style.display = 'table-row';
}

window.onload = cargarAnimes;

async function agregarAFavoritos(tituloAnime, boton) {
    const correoUsuario = sessionStorage.getItem("correoUsuario");

    if (!correoUsuario) {
        alert("Debes iniciar sesión primero");
        return;
    }

    const formData = new FormData();
    formData.append("correo", correoUsuario);
    formData.append("titulo_anime", tituloAnime);
    formData.append("accion", "añadir"); // Ahora enviamos la acción de añadir

    try {
        const respuesta = await fetch("http://localhost/Catalogo_Anime/gestionarfavoritos.php", {
            method: "POST",
            body: formData
        });

        const resultado = await respuesta.json(); // Convertimos la respuesta en JSON

        if (resultado.error) {
            alert(resultado.error);
        } else if (resultado.message.includes("ya está en favoritos")) {
            alert("Este anime ya está en favoritos.");
            boton.innerText = "✅ Agregado";
            boton.disabled = true;
            boton.style.backgroundColor = "#ccc"; // Cambia el color del botón
        } else {
            alert(resultado.message);
            boton.innerText = "✅ Agregado";
            boton.disabled = true;
            boton.style.backgroundColor = "#ccc"; // Cambia el color del botón
        }
    } catch (error) {
        console.error("Error al agregar a favoritos:", error);
    }
}

function filtrarAnimes() {
    let input = document.getElementById("busqueda").value.toLowerCase();
    let table = document.getElementById("tabla_Anime");
    let tr = table.getElementsByTagName("tr");
    
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            let texto = td.textContent || td.innerText;
            tr[i].style.display = texto.toLowerCase().includes(input) ? "" : "none";
        }
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
