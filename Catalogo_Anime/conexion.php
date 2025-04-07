<?php
// Definición de las credenciales de la base de datos
$servidor = "localhost";  // Cambia por la dirección de tu servidor de base de datos
$usuario = "root";        // Cambia por tu usuario de base de datos
$contrasena = "";         // Cambia por tu contraseña de base de datos
$nombre_bd = "catalogo_animes"; // Nombre de la base de datos

try {
    // Establecer la conexión con la base de datos usando PDO
    $conn = new PDO("mysql:host=$servidor;dbname=$nombre_bd", $usuario, $contrasena);
    
    // Establecer el modo de error de PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Si la conexión es exitosa, puedes agregar un mensaje de éxito (opcional)
    // echo "Conexión exitosa a la base de datos.";
} catch (PDOException $e) {
    // Si hay un error en la conexión, se captura la excepción y se muestra el mensaje de error
    echo "Error de conexión: " . $e->getMessage();
    exit();  // Terminar la ejecución si la conexión falla
}
?>
