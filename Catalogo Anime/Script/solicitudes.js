// Obtener el correo del usuario desde sessionStorage
const correoUsuario = sessionStorage.getItem("correoUsuario");
if (!correoUsuario) {
    window.location.href = "login.html"; // Redirige si no hay correo
}

function enviarSolicitud() {
    const titulo = document.getElementById('titulo').value.trim();
    const contenido = document.getElementById('contenido').value.trim();

    if (titulo === "" || contenido === "") {
        alert("Por favor, completa ambos campos.");
        return;
    }

    // Datos a enviar en formato JSON, incluyendo el correo
    const datos = {
        nombre_anime: titulo,
        comentarios: contenido,
        correo: correoUsuario // Se envía el correo del usuario
    };

    // Enviar datos al servidor con fetch()
    fetch('http://localhost/Catalogo_Anime/solicitudes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje) {
            // Mostrar el resultado en la pantalla
            document.getElementById('animeTitulo').textContent = titulo;
            document.getElementById('animeContenido').textContent = contenido;
            document.getElementById('output').style.display = 'block';

            // Limpiar formulario
            document.getElementById('FormularioAnime').reset();
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error al enviar la solicitud.");
    });
}

function restablecerFormulario() {
    window.location.href = 'usuario.html'; // Redirige a usuario.html
}
