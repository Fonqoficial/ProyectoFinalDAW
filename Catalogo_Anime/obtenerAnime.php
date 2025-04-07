<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir ciertos métodos HTTP
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Permitir ciertos encabezados
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluye el archivo de conexión a la base de datos
include 'conexion.php'; // Asegúrate de que el archivo 'conexion.php' esté correctamente configurado

// Definir la consulta SQL para obtener los datos de la tabla 'animes'
$sql = "SELECT id,url_imagen, titulo, tiene_manga, sinopsis, estudio, calificacion, ano_lanzamiento FROM animes";

// Ejecutar la consulta
$stmt = $conn->prepare($sql);
$stmt->execute();

// Verificar si hay resultados
if ($stmt->rowCount() > 0) {
    // Obtener los resultados
    $animes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Devolver los resultados como JSON (puedes cambiar esto si prefieres mostrarlo de otra forma)
    echo json_encode($animes);
} else {
    // Si no hay resultados, devuelve un mensaje de error
    echo json_encode(["error" => "No se encontraron animes en la base de datos."]);
}
?>
