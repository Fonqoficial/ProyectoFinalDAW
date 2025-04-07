<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include 'conexion.php'; // Archivo de conexión a la base de datos

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados en JSON
    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($input['id']) && isset($input['tipo'])) {
        $id = $input['id'];
        $nuevo_tipo = $input['tipo'];

        // Preparar la consulta para actualizar el tipo de usuario
        $sql = "UPDATE usuarios SET tipo = :tipo WHERE id = :id";
        $stmt = $conn->prepare($sql);
        
        try {
            $stmt->execute(['tipo' => $nuevo_tipo, 'id' => $id]);
            echo json_encode(["success" => "Usuario actualizado correctamente"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al actualizar usuario: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Datos incompletos"]);
    }
} else {
    echo json_encode(["error" => "Método no permitido"]);
}
