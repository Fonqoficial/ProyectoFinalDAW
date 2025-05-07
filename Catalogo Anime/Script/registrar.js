document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formRegistro");

    function registrarUsuario(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('http://localhost/Catalogo_Anime/registro.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);

            if (!data.includes('ya está registrado') && !data.includes('Error')) {
                form.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error. Intenta nuevamente.');
        });
    }

    form.addEventListener("submit", registrarUsuario);

    document.getElementById('btnLogin').addEventListener('click', function () {
        window.location.href = 'login.html';
    });

    // ✅ Mover esta parte AQUÍ dentro del DOMContentLoaded
    document.getElementById("mostrarContrasena").addEventListener("change", function() {
        const inputContrasena = document.getElementById("contrasena");
        inputContrasena.type = this.checked ? "text" : "password";
    });
});
