<?php

require_once  __DIR__."/../DAO/productoDao.php";



$function = $_GET['function'];


switch($function){

    case 'ver';
    verproductos();
    break;
    case 'eliminar';
    eliminarproductos();
    break;
    case 'agregar';
    agregarproductos();
    break;
    case 'buscar';
    buscarproductos();
    break;
    case 'obtener';
    obtener();
    break;

    case "modificar":
        modificarProducto();
        break;

}
    function verproductos(){

        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $stock = $_POST['stock'];
        $precio = $_POST['precio'];
        $imagen_url = $_POST['imagen'];
        $resultado = (new productos)->verproductos($id,$nombre,$stock,$precio, $imagen_url);
        echo json_encode($resultado);

    }

    function eliminarproductos() {
        
        $id = $_POST['id'];
        $resultado = (new productos())->eliminarproductos($id);
        echo json_encode($resultado);
    }
    
    function agregarproductos() {
        $nombre = $_POST['nombre'];
        $stock = $_POST['stock'];
        $precio = $_POST['precio'];
        $imagen = isset($_FILES['imagen']) ? $_FILES['imagen'] : null;
        $resultado = (new productos())->agregarproductos($nombre, $stock, $precio, $imagen); 
        echo json_encode($resultado);
    }

    function modificarProducto() {
        $nombre = $_POST['nombre'];
        $stock = $_POST['stock'];
        $precio = $_POST['precio'];
        $imagen = isset($_FILES['imagen']) ? $_FILES['imagen'] : null;
        $id = $_POST["id"];
        $resultado = (new productos())->modificarProducto($nombre, $stock, $precio, $imagen,$id); 
        echo json_encode($resultado);
    }
    
    
    function buscarproductos() {
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $resultado = (new productos())->buscarproductos($nombre, $precio);
        echo json_encode($resultado);
    }

    function obtener() {
        $resultado = (new productos())->obtener();
        echo json_encode($resultado);
        
    }
    
?>