<?php
// Permitir solicitudes CORS (si estás usando frontend separado)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

session_start(); // Asegúrate de tener al usuario autenticado

include 'conexion.php'; // conexión PDO $conn

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Reemplaza esto por el método que uses para obtener el ID del usuario actual
    // Puede venir de la sesión o de algún token que estés manejando
    $correo = trim($_POST['correo']);  // O podrías usar $_SESSION['correo'] si ya está autenticado
    $contrasena_actual = $_POST['currentPassword'];
    $nueva_contrasena = $_POST['newPassword'];
    $confirmar_contrasena = $_POST['confirmPassword'];

    // Validar que no haya campos vacíos
    if (empty($correo) || empty($contrasena_actual) || empty($nueva_contrasena) || empty($confirmar_contrasena)) {
        echo "Todos los campos son obligatorios.";
        exit();
    }

    // Validar que las nuevas contraseñas coincidan
    if ($nueva_contrasena !== $confirmar_contrasena) {
        echo "Las nuevas contraseñas no coinciden.";
        exit();
    }

    // Obtener el hash de la contraseña actual desde la BD
    $stmt = $conn->prepare("SELECT contrasena FROM usuarios WHERE correo = :correo");
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        echo "Usuario no encontrado.";
        exit();
    }

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    $hash_actual = $usuario['contrasena'];

    // Verificar que la contraseña actual sea correcta
    if (!password_verify($contrasena_actual, $hash_actual)) {
        echo "La contraseña actual no es válida.";
        exit();
    }

    // Verificar que la nueva contraseña no sea igual a la actual
    if (password_verify($nueva_contrasena, $hash_actual)) {
        echo "La nueva contraseña no puede ser igual a la actual.";
        exit();
    }

    // Hashear la nueva contraseña
    $nuevo_hash = password_hash($nueva_contrasena, PASSWORD_DEFAULT);

    // Actualizar la contraseña en la base de datos
    $update = $conn->prepare("UPDATE usuarios SET contrasena = :nueva WHERE correo = :correo");
    $update->bindParam(':nueva', $nuevo_hash);
    $update->bindParam(':correo', $correo);

    try {
        $update->execute();
        echo "Contraseña modificada correctamente.";
    } catch (PDOException $e) {
        echo "Error al modificar la contraseña: " . $e->getMessage();
    }
}
?>
