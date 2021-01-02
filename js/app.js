//buscar datos en la base de datos y convertirlo a json
//https://handsontable.com/docs/8.2.0/tutorial-introduction.html
var hot;
var hooks;
$(document).ready(function(){
   $.ajax({
       url: 'api.php?action=listar',
       success: function(data){
          var dato=JSON.parse(data);
          mostrar(dato);
       }
   })

});
var boton=document.getElementById('save');
boton.addEventListener('click',guardar);
function guardar(){
   var todo=JSON.stringify( hot.getData());
   console.log(todo);
  $.ajax({
    url: 'api.php?action=guardar',
    method: 'POST',
    data: {
      info: todo
    },
    success: function(resp){
      alert(resp);
    }
  });
}

function mostrar(datos){
    console.log(datos);
  var container = document.getElementById('datos');
    hot = new Handsontable(container, {
    data: datos,
    colHeaders: ['Id', 'Nombre', 'Cantidad', 'Precio', 'Total'],
    columns: [
      {
       data: 'id',
       editor: false      
      },
      {
        data: 'nombre',
        editor: false      
       },
       {
        data: 'cantidad',
        editor: 'numeric'      
       }, 
       {
        data: 'precio',
        editor: 'numeric'      
       },
       {
        data: 'total',
        editor: 'numeric'      
       },
    ],
    afterChange: (changes)=>{
      
        
        if (changes!=null){
          var row=changes[0][0];
          var campo=changes[0][1];
          var oldval=changes[0][2];
          var newval=changes[0][3];
          //obtener el id de esa fila
          var idrow=hot.getDataAtRowProp(row,'id');
          //

          console.log(`id registro: ${idrow}, fila ${row}, campo: ${campo}, anterior: ${oldval}, nuevo: ${newval}`);
          //actualizar la base de datos
          $.ajax({
            url: 'api.php?action=actualizar_fila',
            method: 'POST',
            data: {
              id: idrow,
              campo: campo,
              valor: newval
            },
            success: function(respo){
              console.log(respo);
            }

          });
        }
     
    },
    licenseKey: 'non-commercial-and-evaluation'
  });
} 
//callback afterchange
