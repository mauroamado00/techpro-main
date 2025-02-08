<?php
// Incluir la conexión y la clase de usuario
require_once __DIR__ . '/../DAO/usuarioDao.php';

// Crear una instancia de la clase usuario
$usuario = new usuario();

// Obtener los datos de la solicitud (en formato JSON)
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['email'])) {
    $email = $data['email'];

    // Llamar al método eliminar usuario
    $response = $usuario->eliminarusuario($email);

    // Devolver una respuesta en JSON
    echo json_encode([
        'success' => $response->getExito(),
        'message' => $response->getMensaje()
    ]);
} else {
    // Si no se pasa el email correctamente, devolver error
    echo json_encode([
        'success' => false,
        'message' => 'Email no proporcionado.'
    ]);
}
?>
