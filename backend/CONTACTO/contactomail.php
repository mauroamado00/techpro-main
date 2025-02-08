<?php
// Establecer la cabecera para indicar que estamos respondiendo con JSON
header('Content-Type: application/json');

// Configuración de la base de datos (modifica estos valores con tus credenciales)
$host = 'localhost';      // Cambiar a tu host
$dbname = 'techpro';    // Cambiar a tu nombre de base de datos
$username = 'root';    // Cambiar a tu usuario de base de datos
$password = ''; // Cambiar a tu contraseña de base de datos

// Crear la conexión con la base de datos usando PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Establecer el modo de error de PDO para excepciones
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["respuesta" => "Error al conectar a la base de datos: " . $e->getMessage()]);
    exit; // Salir si la conexión falla
}

// Obtener los datos enviados por el frontend (en formato JSON)
$raw_data = file_get_contents("php://input");

// Depuración: Registrar los datos crudos recibidos
error_log("Datos crudos recibidos: " . $raw_data);

// Intentar decodificar los datos JSON
$data = json_decode($raw_data, true);

// Verificar si los datos fueron decodificados correctamente
if ($data === null) {
    echo json_encode(["respuesta" => "Error al procesar los datos. El JSON recibido no es válido."]);
    exit; // Salir si el JSON no es válido
}

// Verificar que los campos necesarios están presentes
if (!isset($data['nombre'], $data['correo'], $data['mensaje'])) {
    echo json_encode(["respuesta" => "Faltan datos para procesar la solicitud."]);
    exit; // Salir si faltan datos
}

// Validar los datos recibidos
$nombre = trim($data['nombre']);
$correo = trim($data['correo']);
$mensaje = trim($data['mensaje']);

// Validar el correo electrónico (usando una validación básica)
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["respuesta" => "El correo electrónico no es válido."]);
    exit; // Salir si el correo no es válido
}

// Verificar que el nombre y el mensaje no están vacíos
if (empty($nombre) || empty($mensaje)) {
    echo json_encode(["respuesta" => "El nombre y el mensaje no pueden estar vacíos."]);
    exit; // Salir si el nombre o el mensaje están vacíos
}

// Verificar cuántos mensajes han sido enviados desde el mismo correo electrónico
$sql_check = "SELECT COUNT(*) FROM mensajes WHERE correo = :correo";
$stmt_check = $pdo->prepare($sql_check);
$stmt_check->bindParam(':correo', $correo);
$stmt_check->execute();
$mensaje_count = $stmt_check->fetchColumn();

// Si ya se han enviado 3 o más mensajes con el mismo correo, rechazar el mensaje
if ($mensaje_count >= 3) {
    echo json_encode(["respuesta" => "Has alcanzado el límite de 3 mensajes con este correo electrónico."]);
    exit; // Salir si el límite de 3 mensajes se ha alcanzado
}

// Preparar la consulta SQL para insertar el mensaje
$sql = "INSERT INTO mensajes (nombre, correo, mensaje) VALUES (:nombre, :correo, :mensaje)";
$stmt = $pdo->prepare($sql);

// Bind de los parámetros
$stmt->bindParam(':nombre', $nombre);
$stmt->bindParam(':correo', $correo);
$stmt->bindParam(':mensaje', $mensaje);

try {
    // Ejecutar la consulta para insertar el mensaje
    $stmt->execute();
    echo json_encode(["respuesta" => "Mensaje enviado correctamente."]);
} catch (PDOException $e) {
    // En caso de error, mostrar el mensaje
    echo json_encode(["respuesta" => "Error al insertar los datos en la base de datos: " . $e->getMessage()]);
}
?>
