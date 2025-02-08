<?php
require_once __DIR__ . '/../CONEXION/conexion.php';

// Inicializar la conexión
$conn = connection();

// Verificar si se ha pasado el parámetro 'id' para eliminar
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Asegurarse de que el id sea un número entero

    // Preparar la sentencia SQL para eliminar el mensaje
    $sql = "DELETE FROM mensajes WHERE id = ?";

    if ($stmt = $conn->prepare($sql)) {
        // Vincular el parámetro de la consulta
        $stmt->bind_param("i", $id); // "i" para entero

        // Ejecutar la sentencia
        if ($stmt->execute()) {
            // Enviar una respuesta exitosa
            echo json_encode(["success" => true, "message" => "Mensaje eliminado correctamente."]);
        } else {
            // Enviar error si la ejecución falla
            echo json_encode(["success" => false, "message" => "Error al eliminar el mensaje."]);
        }

        // Cerrar la declaración
        $stmt->close();
    } else {
        // Enviar error si la preparación de la consulta falla
        echo json_encode(["success" => false, "message" => "Error en la consulta."]);
    }
} else {
    // Si no se ha pasado 'id', proceder a mostrar los mensajes

    // Consultar los mensajes
    $sql = "SELECT id, nombre, correo, mensaje, fecha FROM mensajes"; // Asegúrate de que la columna "fecha" existe en tu tabla
    $result = $conn->query($sql);

    $mensajes = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $mensajes[] = $row; // Agregar cada fila al array de mensajes
        }
    }

    // Devolver los mensajes como JSON
    header('Content-Type: application/json');
    echo json_encode($mensajes);

    // Cerrar la conexión
    $conn->close();
}
?>
