<?php

    session_start();
    require_once __DIR__ . '/../conexion/conexion.php';
    require_once __DIR__ . "/respuesta.php";

    class SesionDao {

        public $email;
        public $password;

        // Method to initiate session login
        public function iniciarSesion($email, $password) {
            $conection = connection();
            
            // Use prepared statements to prevent SQL injection
            $sql = "SELECT * FROM usuario WHERE email = ? AND password = ?";
            $stmt = $conection->prepare($sql);
            $stmt->bind_param("ss", $email, $password);
            $stmt->execute();
            $respuesta = $stmt->get_result();
            $fila = $respuesta->fetch_assoc();
            
            // Debugging: Log the query and result
            error_log("SQL Query executed: $sql");
            error_log("Fetched user data: " . print_r($fila, true));

            // Check if a matching user was found
            if ($fila != null) {
                // Set the session with the user data
                $_SESSION['sesion'] = ["usuario" => $fila];
                
                // Return success response with session data
                return new Respuesta(estado: true, mensaje: "Sesion Iniciada", datos: $_SESSION['sesion']);
            } else {
                // Handle case where no matching user is found
                $_SESSION['sesion'] = null; // Clear any existing session
                return new Respuesta(estado: false, mensaje: "Error al iniciar", datos: null);
            }
        }

        // Method to get current session data
        public function obtenerSesion() {
            if (isset($_SESSION['sesion'])) {
                return new Respuesta(true, "Sesion obtenida", $_SESSION['sesion']);
            } else {
                return new Respuesta(false, "No se ha encontrado una sesion", null);
            }
        }

        // Method to handle logout and clear session
        public function cerrarSesion(): void {
            $_SESSION['sesion'] = null;
        }

        // Method to check if user is logged in
        public function estaloggeado(): Respuesta {
            if (isset($_SESSION['sesion'])) {
                return new Respuesta(true, "Sesion iniciada", $_SESSION['sesion']);
            } else {
                return new Respuesta(false, "No se ha encontrado una sesion", null);
            }
        }
    }

?>
