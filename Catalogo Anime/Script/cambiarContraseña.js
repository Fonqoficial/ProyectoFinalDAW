const correoUsuario = sessionStorage.getItem("correoUsuario");
if (!correoUsuario) {
  window.location.href = "login.html";
}

document.getElementById('togglePassword').addEventListener('change', function () {
  const newPasswordInput = document.getElementById('newPassword');
  newPasswordInput.type = this.checked ? 'text' : 'password';
});

document.getElementById('passwordForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    alert("Las nuevas contraseñas no coinciden. Por favor, verifica.");
    return;
  }

  if (newPassword === currentPassword) {
    alert("La nueva contraseña no puede ser igual a la actual.");
    return;
  }

  const confirmChange = confirm("Vas a modificar la contraseña del usuario. ¿Estás de acuerdo?");
  if (confirmChange) {
    fetch('http://localhost/Catalogo_Anime/cambiarContraseña.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        correo: correoUsuario,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      })
    })
      .then(response => response.text())
      .then(data => {
        alert(data);

        if (data.includes("Contraseña modificada correctamente")) {
          // Redirigir al usuario si todo fue exitoso
          window.location.href = "usuario.html";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al cambiar la contraseña.');
      });
  }
});