document.getElementById("FormularioLogin").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página se recargue

    const formData = new FormData(this);
    const mensajeError = document.getElementById("mensajeError");

    // Limpia el mensaje anterior
    mensajeError.textContent = "";
    mensajeError.className = "mensaje"; // Quita clases anteriores

    try {
        const response = await fetch("http://localhost/Catalogo_Anime/login.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.error) {

            // Mostrar mensaje en la página
            mensajeError.textContent = data.error;
            mensajeError.classList.add("error"); // Aplica estilo rojo
        } else if (data.success) {
            mensajeError.textContent = "Inicio de sesión exitoso. Redirigiendo...";
            mensajeError.classList.add("success");

            // Guardar el correo en sessionStorage
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
        mensajeError.classList.add("error");
    }
});

document.getElementById("mostrarContrasena").addEventListener("change", function() {
    const inputContrasena = document.getElementById("contrasena");
    inputContrasena.type = this.checked ? "text" : "password";
});

