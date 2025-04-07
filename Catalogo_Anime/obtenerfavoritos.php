<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

if (!isset($_GET['correo']) || empty(trim($_GET['correo']))) {
    echo json_encode(["error" => "Correo no proporcionado"]);
    exit();
}

$correo = trim($_GET['correo']);

try {
    // Obtener ID del usuario
    $sqlUsuario = "SELECT id FROM usuarios WHERE correo = :correo";
    $stmtUsuario = $conn->prepare($sqlUsuario);
    $stmtUsuario->bindParam(':correo', $correo);
    $stmtUsuario->execute();
    $usuario = $stmtUsuario->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        echo json_encode(["error" => "Usuario no encontrado"]);
        exit();
    }

    $id_usuario = $usuario['id'];

    // Obtener los detalles de los animes favoritos
    $sqlFavoritos = "SELECT a.id, a.titulo, a.calificacion,a.tiene_manga,a.sinopsis,a.estudio, a.ano_lanzamiento, a.url_imagen 
                     FROM favoritos f
                     JOIN animes a ON f.id_anime = a.id
                     WHERE f.id_usuario = :id_usuario";
                     
    $stmtFavoritos = $conn->prepare($sqlFavoritos);
    $stmtFavoritos->bindParam(':id_usuario', $id_usuario);
    $stmtFavoritos->execute();
    
    $favoritos = $stmtFavoritos->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["favoritos" => $favoritos]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
