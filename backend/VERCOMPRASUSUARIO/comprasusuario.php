<?php
require_once __DIR__ . '/../CONEXION/conexion.php';

$conn = connection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $sql = "SELECT c.id, c.nombrecompleto, c.ciudad, c.numerodetelefono, c.email, c.metododeenvio, 
                    c.direccion, c.metododepago, p.idProducto, p.cantidad, pr.nombre AS producto_nombre 
            FROM compra c
            LEFT JOIN productocompra p ON c.id = p.idCompra
            LEFT JOIN producto pr ON p.idProducto = pr.id";

    $result = $conn->query($sql);

    if (!$result) {
        http_response_code(500);
        echo json_encode(["error" => "Error en la consulta: " . $conn->error]);
        exit;
    }

    $compras = [];
    $compraMap = [];

    while ($row = $result->fetch_assoc()) {
        $compraId = $row['id'];

        if (!isset($compraMap[$compraId])) {
            $compraMap[$compraId] = [
                'id' => $row['id'],
                'nombrecompleto' => $row['nombrecompleto'],
                'ciudad' => $row['ciudad'],
                'numerodetelefono' => $row['numerodetelefono'],
                'email' => $row['email'],
                'metododeenvio' => $row['metododeenvio'],
                'direccion' => $row['direccion'],
                'metododepago' => $row['metododepago'],
                'productos' => []
            ];
        }

        if (!empty($row['idProducto'])) {
            $compraMap[$compraId]['productos'][] = [
                'nombreProducto' => $row['producto_nombre'],
                'cantidad' => $row['cantidad']
            ];
        }
    }

    $compras = array_values($compraMap);

   
    header('Content-Type: application/json');
    echo json_encode($compras);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['idCompra'])) {
        $idCompra = $input['idCompra'];

        $sql = "DELETE FROM compra WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $idCompra);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Compra rechazada y eliminada."]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error al rechazar la compra: " . $conn->error]);
        }

        $stmt->close();
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "ID de compra no proporcionado."]);
    }
} else {
  
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido."]);
}

$conn->close();
?>
