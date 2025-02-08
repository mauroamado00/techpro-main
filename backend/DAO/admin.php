<?php

require_once __DIR__ . '/../DAO/usuarioDao.php';

$usuario = new usuario();

// Obtener usuarios
$usuarios = $usuario->obtenerusuario();

if ($usuarios) {
    echo json_encode($usuarios); // Devolver los usuarios en formato JSON
} else {
    echo json_encode(["error" => "No se encontraron usuarios."]);
}
?>
