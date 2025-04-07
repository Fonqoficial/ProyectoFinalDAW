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
