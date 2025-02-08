<?php
// Configuración para enviar correos con PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluir PHPMailer (ajustar la ruta según la ubicación de PHPMailer)
require 'vendor/autoload.php';  // Asegúrate de tener PHPMailer instalado

// Configuración de la respuesta
$response = array('success' => false, 'message' => '');

// Verificar que la solicitud es de tipo POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Verificar si el email está presente
    if (isset($_POST['email']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $email = $_POST['email'];

        // Generar un código aleatorio (6 dígitos)
        $codigo = rand(100000, 999999);

        // Configuración del correo
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';  // Cambia esto si usas otro servicio de correo
            $mail->SMTPAuth = true;
            $mail->Username = 'tu_correo@gmail.com';  // Tu correo de envío
            $mail->Password = 'tu_contraseña';  // Tu contraseña de correo o token
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Destinatario y remitente
            $mail->setFrom('tu_correo@gmail.com', 'Soporte');
            $mail->addAddress($email);

            // Contenido del correo
            $mail->isHTML(true);
            $mail->Subject = 'Código de Cambio de Contraseña';
            $mail->Body    = "Tu código de cambio de contraseña es: <strong>$codigo</strong>";

            // Enviar el correo
            $mail->send();

            // Responder con éxito
            $response['success'] = true;
            $response['message'] = 'Te hemos enviado un código al correo: ' . $email;
        } catch (Exception $e) {
            $response['message'] = "Hubo un error al enviar el correo. Error: {$mail->ErrorInfo}";
        }
    } else {
        $response['message'] = 'Correo electrónico inválido.';
    }
} else {
    $response['message'] = 'Método de solicitud no válido. Asegúrate de que la solicitud sea POST.';
}

// Establecer el tipo de contenido como JSON y devolver la respuesta
header('Content-Type: application/json');
echo json_encode($response);
exit;
?>
