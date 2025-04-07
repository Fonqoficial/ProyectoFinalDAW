<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir ciertos métodos HTTP
header("Access-Control-Allow-Methods: POST");
// Permitir ciertos encabezados
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir la conexión a la base de datos
include 'conexion.php'; // Asegúrate de que 'conexion.php' esté correctamente configurado

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados en formato JSON
    $datos = json_decode(file_get_contents("php://input"), true);

    // Verificar que los datos existen y no están vacíos
    if (!isset($datos['nombre_anime']) || !isset($datos['comentarios']) || !isset($datos['correo']) ||
        empty(trim($datos['nombre_anime'])) || empty(trim($datos['comentarios'])) || empty(trim($datos['correo']))) {
        echo json_encode(["error" => "Faltan datos o están vacíos."]);
        exit();
    }

    // Asignar los valores
    $nombre_anime = trim($datos['nombre_anime']);
    $comentarios = trim($datos['comentarios']);
    $correo = trim($datos['correo']);

    try {
        // Buscar el ID del usuario en la base de datos usando su correo
        $sql_id = "SELECT id FROM usuarios WHERE correo = :correo LIMIT 1";
        $stmt_id = $conn->prepare($sql_id);
        $stmt_id->bindParam(':correo', $correo);
        $stmt_id->execute();
        $usuario = $stmt_id->fetch(PDO::FETCH_ASSOC);

        if (!$usuario) {
            echo json_encode(["error" => "No se encontró un usuario con ese correo."]);
            exit();
        }

        $id_usuario = $usuario['id'];

        // Preparar la consulta SQL para insertar en la base de datos
        $sql = "INSERT INTO solicitudes (nombre_anime, comentarios, id_usuario) VALUES (:nombre_anime, :comentarios, :id_usuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre_anime', $nombre_anime);
        $stmt->bindParam(':comentarios', $comentarios);
        $stmt->bindParam(':id_usuario', $id_usuario);

        // Ejecutar la consulta
        $stmt->execute();
        echo json_encode(["mensaje" => "Solicitud de anime registrada exitosamente."]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al registrar la solicitud: " . $e->getMessage()]);
    }
} else {
    // Si la solicitud no es POST, devolver error
    echo json_encode(["error" => "Método no permitido."]);
}
?>
