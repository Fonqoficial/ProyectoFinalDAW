<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir la conexión a la base de datos
include 'conexion.php';

// Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Preparar la consulta con PDO
    $sql = "SELECT u.nombre_usuario AS usuario, s.nombre_anime, s.fecha_solicitud, s.comentarios 
            FROM solicitudes s
            JOIN usuarios u ON s.id = u.id
            ORDER BY s.fecha_solicitud DESC";

    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Obtener los resultados en un array asociativo
    $solicitudes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($solicitudes)) {
        echo json_encode($solicitudes);
    } else {
        echo json_encode(["mensaje" => "No hay solicitudes disponibles"]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la consulta: " . $e->getMessage()]);
}

// Cerrar la conexión (PDO no requiere explícitamente cerrar)
$conn = null;
?>
