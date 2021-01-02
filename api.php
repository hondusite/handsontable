<?php
//recibir json
require 'conexion.php';
if (isset($_GET['action'])){
  $action=$_GET['action'];
  if ($action=='listar'){

  $resultados=array();
  $query=mysqli_query($con,"SELECT * FROM detalle_factura");
  $i=0;
  while ($row=mysqli_fetch_array($query)){
    $resultados[$i]['id']=$row['id'];
    $resultados[$i]['nombre']=$row['nombre'];
    $resultados[$i]['cantidad']=$row['cantidad'];
    $resultados[$i]['precio']=$row['precio'];
    $resultados[$i]['total']=$row['total'];    
    $i++;
  }
  $resultadosJSON=json_encode($resultados);
  echo $resultadosJSON;
  //echo $_GET['jsoncallback'].'('.$resultadosJSON.');';
  }
  if ($action=='actualizar_fila'){
    $id=$_POST['id'];
    $campo=$_POST['campo'];
    $valor=$_POST['valor'];
    $query=mysqli_query($con,"UPDATE detalle_factura SET $campo='$valor' WHERE id='$id'");
    if ($query){
      echo 'Dato registrado';
    }else{
      echo 'Ocurrió un error';
    }
  }
  if ($action=='guardar'){
   $info=json_decode($_POST['info'],true);
   
  
    foreach ($info as $fila){
      //echo $fila[0].' '.$fila[1].'<br>';
      $id=$fila[0];
      $cantidad=$fila[2];
      $precio=$fila[3];
      $total=$fila[4];
      //actualizar
      $upd=mysqli_query($con,"UPDATE detalle_factura SET cantidad='$cantidad', precio='$precio', total='$total' WHERE id='$id'");
    }
    echo 'Datos actualizados';
  }
}
?>