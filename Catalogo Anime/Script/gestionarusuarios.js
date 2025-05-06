

const url = 'http://localhost/Catalogo_Anime/gestionarUsuarios.php';

document.addEventListener("DOMContentLoaded", function () {
    // Obtener el color guardado en localStorage
    let colorGuardado = localStorage.getItem("themeColor");

    // Aplicar el color si existe
    if (colorGuardado) {
        document.body.style.backgroundColor = colorGuardado;
    }
});

async function cargarUsuarios() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById('tablaUsuarios').innerHTML = `<tr><td colspan='5'>${data.error}</td></tr>`;
            return;
        }

        let filas = '';
        data.forEach(usuario => {
            filas += `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nombre_usuario}</td>
                        <td>${usuario.correo}</td>
                        <td id="tipo-${usuario.id}">${usuario.tipo}</td>
                        <td>
                            <select id="select-${usuario.id}">
                                <option>Seleccione un tipo</option>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                            <button onclick="modificarUsuario(${usuario.id})">Modificar</button>
                        </td>
                      </tr>`;
        });
        document.getElementById('tablaUsuarios').innerHTML = filas;
    } catch (error) {
        console.error('Error cargando los usuarios:', error);
    }
}

async function modificarUsuario(id) {
    const nuevoTipo = document.getElementById(`select-${id}`).value;

    try {
        const response = await fetch('http://localhost/Catalogo_Anime/modificarUsuarios.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, tipo: nuevoTipo })
        });

        const resultado = await response.json();
        if (resultado.success) {
            document.getElementById(`tipo-${id}`).innerText = nuevoTipo;
            alert('Usuario actualizado correctamente');
        } else {
            alert('Error al actualizar usuario: ' + resultado.error);
        }
    } catch (error) {
        console.error('Error al modificar el usuario:', error);
    }
}

window.onload = cargarUsuarios;
