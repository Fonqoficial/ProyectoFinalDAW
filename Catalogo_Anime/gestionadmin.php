<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir la conexión a la base de datos
include 'conexion.php'; // Asegúrate de que 'conexion.php' es correcto

// Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Recibir datos
$id = trim($_REQUEST['id'] ?? ''); // Se añade la opción de id
$titulo = trim($_REQUEST['titulo'] ?? '');
$calificacion = trim($_REQUEST['calificacion'] ?? '');
$ano_lanzamiento = trim($_REQUEST['ano_lanzamiento'] ?? '');
$url_imagen = trim($_REQUEST['url_imagen'] ?? '');
$sinopsis = trim($_REQUEST['sinopsis'] ?? '');
$estudio = trim($_REQUEST['estudio'] ?? '');
$tiene_manga = trim($_REQUEST['tiene_manga'] ?? '');
$accion = trim($_REQUEST['accion'] ?? '');


// Validar que la acción sea válida
if (!in_array($accion, ["insertar", "modificar", "eliminar"])) {
    echo json_encode(["error" => "Acción no válida."]);
    exit();
}

// Validar que los datos no estén vacíos para insertar o modificar
if (($accion === "insertar" || $accion === "modificar") && (empty($titulo) || empty($calificacion) || empty($ano_lanzamiento))) {
    echo json_encode(["error" => "Todos los campos son obligatorios para esta acción."]);
    exit();
}

try {
    // Si la acción es "insertar", agregar nuevo anime
    if ($accion === "insertar") {
        $sqlInsert = "INSERT INTO animes (titulo, calificacion, ano_lanzamiento, url_imagen, sinopsis, estudio, tiene_manga) 
                      VALUES (:titulo, :calificacion, :ano_lanzamiento, :url_imagen, :sinopsis, :estudio, :tiene_manga)";
        $stmt = $conn->prepare($sqlInsert);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':calificacion', $calificacion);
        $stmt->bindParam(':ano_lanzamiento', $ano_lanzamiento);
        $stmt->bindParam(':url_imagen', $url_imagen);
        $stmt->bindParam(':sinopsis', $sinopsis);
        $stmt->bindParam(':estudio', $estudio);
        $stmt->bindParam(':tiene_manga', $tiene_manga);
        $stmt->execute();

        echo json_encode(["message" => "Anime agregado exitosamente."]);
        exit();
    }

 // Si la acción es "modificar", actualizar datos del anime
if ($accion === "modificar") {
    // Se actualiza la consulta SQL para incluir tanto el id como el título
    $sqlUpdate = "UPDATE animes 
                  SET titulo = :titulo, calificacion = :calificacion, ano_lanzamiento = :ano_lanzamiento, 
                      url_imagen = :url_imagen, sinopsis = :sinopsis, 
                      estudio = :estudio, tiene_manga = :tiene_manga 
                  WHERE id = :id"; // Se usa id para realizar la actualización

    // Preparamos la consulta SQL
    $stmt = $conn->prepare($sqlUpdate);

    // Asignamos los valores de los parámetros a la consulta
    $stmt->bindParam(':id', $id, PDO::PARAM_INT); // Se usa id para la condición WHERE
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':calificacion', $calificacion);
    $stmt->bindParam(':ano_lanzamiento', $ano_lanzamiento);
    $stmt->bindParam(':url_imagen', $url_imagen);
    $stmt->bindParam(':sinopsis', $sinopsis);
    $stmt->bindParam(':estudio', $estudio);
    $stmt->bindParam(':tiene_manga', $tiene_manga);

    // Ejecutamos la consulta
    $stmt->execute();

    // Verificamos si la actualización fue exitosa
    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "Anime modificado correctamente."]);
    } else {
        echo json_encode(["message" => "No se encontró el anime para modificar o no se realizaron cambios."]);
    }

    exit();
}


    // Si la acción es "eliminar", borrar el anime
    if ($accion === "eliminar") {
        $sqlDelete = "DELETE FROM animes WHERE titulo = :titulo";
        $stmt = $conn->prepare($sqlDelete);
        $stmt->bindParam(':titulo', $titulo);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "Anime eliminado correctamente."]);
        } else {
            echo json_encode(["message" => "No se encontró el anime para eliminar."]);
        }
        exit();
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
