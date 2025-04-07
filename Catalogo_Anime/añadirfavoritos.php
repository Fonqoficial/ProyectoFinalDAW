<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir la conexión a la base de datos
include 'conexion.php'; // Asegúrate de que 'conexion.php' es correcto y se conecta a la BD

// Mostrar errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Recibir datos desde GET o POST
$correo = trim($_REQUEST['correo'] ?? '');
$titulo_anime = trim($_REQUEST['titulo_anime'] ?? '');
$accion = trim($_REQUEST['accion'] ?? '');

// Validar que los datos no estén vacíos
if (empty($correo) || empty($titulo_anime) || empty($accion)) {
    echo json_encode(["error" => "Todos los campos son obligatorios."]);
    exit();
}

// Validar que la acción sea válida ("añadir" o "eliminar")
if ($accion !== "añadir" && $accion !== "eliminar") {
    echo json_encode(["error" => "Acción no válida."]);
    exit();
}

try {
    // Buscar el ID del usuario por su correo
    $sqlUsuario = "SELECT id FROM usuarios WHERE correo = :correo";
    $stmt = $conn->prepare($sqlUsuario);
    $stmt->bindParam(':correo', $correo);
    $stmt->execute();
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode(["error" => "Usuario no encontrado."]);
        exit();
    }

    $id_usuario = $usuario["id"];

    // Buscar el ID del anime por su título
    $sqlAnime = "SELECT id FROM animes WHERE titulo = :titulo_anime";
    $stmt = $conn->prepare($sqlAnime);
    $stmt->bindParam(':titulo_anime', $titulo_anime);
    $stmt->execute();
    $anime = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$anime) {
        echo json_encode(["error" => "Anime no encontrado."]);
        exit();
    }

    $id_anime = $anime["id"];

    // Si la acción es "añadir", insertar en favoritos
    if ($accion === "añadir") {
        // Verificar si ya está en favoritos
        $sqlCheck = "SELECT id FROM favoritos WHERE id_usuario = :id_usuario AND id_anime = :id_anime";
        $stmt = $conn->prepare($sqlCheck);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_anime', $id_anime);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "El anime ya está en favoritos."]);
            exit();
        }

        // Insertar en favoritos
        $sqlInsert = "INSERT INTO favoritos (id_usuario, id_anime) VALUES (:id_usuario, :id_anime)";
        $stmt = $conn->prepare($sqlInsert);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_anime', $id_anime);
        $stmt->execute();

        echo json_encode(["message" => "Anime agregado a favoritos exitosamente."]);
        exit();
    }

    // Si la acción es "eliminar", borrar de favoritos
    if ($accion === "eliminar") {
        $sqlDelete = "DELETE FROM favoritos WHERE id_usuario = :id_usuario AND id_anime = :id_anime";
        $stmt = $conn->prepare($sqlDelete);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_anime', $id_anime);
        $stmt->execute();

        // Verificar si realmente se eliminó algo
        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "Anime eliminado de favoritos exitosamente."]);
        } else {
            echo json_encode(["message" => "El anime no estaba en favoritos."]);
        }
        exit();
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
