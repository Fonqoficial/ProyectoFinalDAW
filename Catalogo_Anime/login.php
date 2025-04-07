<?php
// Permitir solicitudes desde cualquier origen (puedes cambiar "*" por un dominio específico como "http://localhost")
header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');  
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Si la solicitud es de tipo OPTIONS (preflight request), no hacemos nada y respondemos con éxito
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);  // Responde sin hacer nada y sale del script
}

// Incluye el archivo de conexión a la base de datos
include 'conexion.php';
session_start();

header('Content-Type: application/json'); // Indica que la respuesta será en formato JSON

// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recoger los datos del formulario
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Validar que los campos no estén vacíos
    if (empty($correo) || empty($contrasena)) {
        echo json_encode(["error" => "Por favor, complete ambos campos."]);
        exit();
    }

    // Consultar la base de datos para verificar el correo electrónico
    $sql = "SELECT id, contrasena, tipo FROM usuarios WHERE correo = :correo";
    $stmt = $conn->prepare($sql);

    // Usar bindParam para enlazar el parámetro
    $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
    $stmt->execute();

    // Si se encuentra un usuario con ese correo
    if ($stmt->rowCount() > 0) {
        // Obtener los datos del usuario
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        $id_usuario = $usuario['id'];
        $contrasena_hash = $usuario['contrasena'];
        $tipo = $usuario['tipo'];

        // Verificar la contraseña ingresada con la guardada en la base de datos
        if (password_verify($contrasena, $contrasena_hash)) {
            // Iniciar sesión (aquí puedes usar sesiones si lo deseas)
            $_SESSION['id_usuario'] = $id_usuario;
            $_SESSION['correo'] = $correo;
            $_SESSION['tipo'] = $tipo;

            // Redirigir según el tipo de usuario
            echo json_encode(["success" => true, "tipo" => $tipo]);
        } else {
            echo json_encode(["error" => "La contraseña es incorrecta."]);
        }
    } else {
        echo json_encode(["error" => "El correo electrónico no está registrado."]);
    }
}
?>
