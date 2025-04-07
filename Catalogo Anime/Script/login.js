document.getElementById("FormularioLogin").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const formData = new FormData(this);
    const mensajeError = document.getElementById("mensajeError");

    try {
        const response = await fetch("http://localhost/Catalogo_Anime/login.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.error) {
            mensajeError.textContent = data.error; // Muestra el error en la misma página
        } else if (data.success) {
            mensajeError.style.color = "green";
            mensajeError.textContent = "Inicio de sesión exitoso. Redirigiendo...";

            // Guardar el correo en sessionStorage para su uso en usuario.html
            sessionStorage.setItem("correoUsuario", formData.get("correo"));

            setTimeout(() => {
                if (data.tipo === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "usuario.html";
                }
            }, 1500);
        }
    } catch (error) {
        mensajeError.textContent = "Hubo un error en la conexión.";
    }
});
