<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *"); // Esto permite todas las solicitudes desde cualquier origen

// Si estás usando cookies o sesiones, asegúrate de incluir también estos headers
// Si usas cookies o sesiones, puedes necesitar un origen específico en lugar de '*'
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Incluye la conexión a la base de datos
include 'conexion.php';  // Asegúrate de que 'conexion.php' contiene los detalles de conexión a tu base de datos

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtiene los datos enviados por el formulario
    $nombre_usuario = trim($_POST['nombre_usuario']);
    $correo = trim($_POST['correo']);
    $contrasena = $_POST['contrasena'];

    // Validación para asegurarse de que no hay campos vacíos
    if (empty($nombre_usuario) || empty($correo) || empty($contrasena)) {
        echo "Por favor, complete todos los campos.";
        exit();
    }

    // Verificar si el correo ya está registrado en la base de datos
    $sql = "SELECT * FROM usuarios WHERE correo = :correo";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();

    // Si el correo ya está registrado, mostrar un mensaje de error
    if ($stmt->rowCount() > 0) {
        echo "El correo electrónico ya está registrado. Por favor, elige otro.";
        exit();
    }

    // Si el correo no está registrado, continuar con el proceso de registro
    $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);  // Cifra la contraseña antes de almacenarla

    // Inserta el nuevo usuario en la base de datos
    $sql = "INSERT INTO usuarios (nombre_usuario, correo, contrasena) 
            VALUES (:nombre_usuario, :correo, :contrasena)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nombre_usuario', $nombre_usuario);
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':contrasena', $contrasena_hash);

    try {
        // Ejecuta la consulta para insertar los datos
        $stmt->execute();
        echo "¡Usuario registrado exitosamente!";
    } catch (PDOException $e) {
        echo "Error al registrar el usuario: " . $e->getMessage();
    }
}
?>
