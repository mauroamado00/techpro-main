<?php
header("Content-Type: application/json");

// Conexión a la base de datos
$conn = new mysqli("localhost", "root", "", "techpro");

if ($conn->connect_error) {
    echo json_encode(["error" => "Error en la conexión: " . $conn->connect_error]);
    exit();
}

// Detectar el método HTTP
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    // Leer el JSON enviado desde JS
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["error" => "No se recibieron datos válidos"]);
        exit();
    }

    // Validar que todos los campos estén presentes
    if (!isset($data['name'], $data['surname'], $data['age'], $data['position'], $data['hire_date'])) {
        echo json_encode(["error" => "Faltan datos obligatorios"]);
        exit();
    }

    // Insertar en la base de datos
    $stmt = $conn->prepare("INSERT INTO employees (name, surname, age, position, hire_date) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $data['name'], $data['surname'], $data['age'], $data['position'], $data['hire_date']);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Empleado agregado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al agregar empleado"]);
    }

    $stmt->close();
} elseif ($method === "DELETE") {
    // Eliminar un empleado
    parse_str(file_get_contents("php://input"), $deleteData);
    
    if (!isset($deleteData['id'])) {
        echo json_encode(["error" => "ID de empleado no proporcionado"]);
        exit();
    }

    $id = intval($deleteData['id']);
    $stmt = $conn->prepare("DELETE FROM employees WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Empleado eliminado correctamente"]);
    } else {
        echo json_encode(["error" => "Error al eliminar el empleado"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Método HTTP no permitido"]);
}

$conn->close();
?>
