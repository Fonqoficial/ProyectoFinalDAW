// Obtener el correo del usuario desde sessionStorage
const correoUsuario = sessionStorage.getItem("correoUsuario");
if (!correoUsuario) {
    window.location.href = "login.html";
} else {
    document.getElementById("correoUsuario").textContent = correoUsuario;
}

function cerrarSesion() {
    sessionStorage.removeItem("correoUsuario");
    window.location.href = "login.html";
}

function volverAlInicio() {
    window.location.href = "usuario.html";
}

async function cargarFavoritos() {
    const url = 'http://localhost/Catalogo_Anime/obtenerfavoritos.php?correo=' + correoUsuario;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("Error:", data.error);
            return;
        }

        const tableBody = document.querySelector('#TablaAnime tbody');
        tableBody.innerHTML = '';

        if (data.favoritos.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6">No tienes animes favoritos aún.</td></tr>';
            return;
        }

        data.favoritos.forEach((anime, index) => {
            const sinopsis = anime.sinopsis ? anime.sinopsis : "No disponible";
            const estudio = anime.estudio ? anime.estudio : "No disponible";
            const tieneManga = anime.tiene_manga == '1' ? 'Sí' : 'No';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${anime.url_imagen}" alt="${anime.titulo}"></td>
                <td>${anime.titulo}</td>
                <td>${anime.calificacion}</td>
                <td>${anime.ano_lanzamiento}</td>
                <td><button class="show-more-btn" onclick="mostrarMas(${index})">Mostrar más</button></td>
                <td>
                    <button class="fav-btn" onclick="eliminarDeFavoritos('${anime.titulo}', this)">❌ Eliminar</button>
                </td>
            `;

            const hiddenRow = document.createElement('tr');
            hiddenRow.classList.add('hidden-info');
            hiddenRow.style.display = 'none';
            hiddenRow.innerHTML = `
                <td colspan="6">
                    <div>
                        <p><strong>Sinopsis:</strong> ${sinopsis}</p>
                        <p><strong>Estudio:</strong> ${estudio}</p>
                        <p><strong>Tiene Manga:</strong> ${tieneManga}</p>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
            tableBody.appendChild(hiddenRow);
        });

    } catch (error) {
        console.error('Error al cargar los favoritos:', error);
    }
}

function mostrarMas(index) {
    const hiddenRow = document.querySelectorAll('.hidden-info')[index];
    if (hiddenRow) {
        hiddenRow.style.display = (hiddenRow.style.display === 'none') ? 'table-row' : 'none';
    } else {
        console.error("Error: No se encontró la fila oculta para el índice", index);
    }
}

async function eliminarDeFavoritos(tituloAnime, boton) {
    const correoUsuario = sessionStorage.getItem("correoUsuario");

    if (!correoUsuario) {
        alert("Debes iniciar sesión primero");
        return;
    }

    const formData = new FormData();
    formData.append("correo", correoUsuario);
    formData.append("titulo_anime", tituloAnime);
    formData.append("accion", "eliminar");

    console.log("Enviando para eliminar de favoritos:", { correo: correoUsuario, titulo_anime: tituloAnime });

    try {
        const respuesta = await fetch("http://localhost/Catalogo_Anime/gestionarfavoritos.php", {
            method: "POST",
            body: formData
        });

        const resultado = await respuesta.json();

        if (resultado.error) {
            alert(resultado.error);
        } else {
            alert(resultado.message);
            boton.closest("tr").remove(); // Elimina la fila de la tabla
        }
    } catch (error) {
        console.error("Error al eliminar de favoritos:", error);
    }
}

window.onload = cargarFavoritos;