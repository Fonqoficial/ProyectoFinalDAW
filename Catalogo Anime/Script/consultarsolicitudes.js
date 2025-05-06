document.addEventListener("DOMContentLoaded", function () {
    // Obtener el color guardado en localStorage
    let colorGuardado = localStorage.getItem("themeColor");

    // Aplicar el color si existe
    if (colorGuardado) {
        document.body.style.backgroundColor = colorGuardado;
    }
});

async function cargarSolicitudes() {
    try {
        const response = await fetch("http://localhost/Catalogo_Anime/Gestionconsultar.php");
        const solicitudes = await response.json();
        const tablaBody = document.getElementById("tablaSolicitudes");

        if (solicitudes.mensaje) {
            tablaBody.innerHTML = `<tr><td colspan="4">${solicitudes.mensaje}</td></tr>`;
            return;
        }

        tablaBody.innerHTML = solicitudes.map(solicitud => `
            <tr>
                <td>${solicitud.usuario}</td>
                <td>${solicitud.nombre_anime}</td>
                <td>${solicitud.fecha_solicitud}</td>
                <td>${solicitud.comentarios}</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Error al cargar las solicitudes:", error);
        document.getElementById("tablaSolicitudes").innerHTML = `<tr><td colspan="4">Error al obtener los datos</td></tr>`;
    }
}

window.onload = cargarSolicitudes;
