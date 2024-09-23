<?php

$hashedPassword = $_POST['hash'];
// Contraseña proporcionada por el usuario (por ejemplo, de un formulario de inicio de sesión)
$passwordIngresada =  $_POST['password'];

// Verificar si la contraseña ingresada coincide con el hash almacenado
if (password_verify($passwordIngresada, $hashedPassword)) {
    echo "¡Contraseña correcta!";
} else {
    echo "Contraseña incorrecta.";
}

?>