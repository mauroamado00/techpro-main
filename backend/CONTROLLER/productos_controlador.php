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

}
    function verproductos(){

        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $stock = $_POST['stock'];
        $precio = $_POST['precio'];
        $resultado = (new productos)->verproductos($id,$nombre,$stock,$precio);
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
        $resultado = (new productos())->agregarproductos(null, $nombre, $stock, $precio); 
        echo json_encode($resultado);
    }
    
    
    function buscarproductos() {
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $resultado = (new productos())->buscarproductos($nombre, $precio);
        echo json_encode($resultado);
    }
    


?>