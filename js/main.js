const carrito= document.querySelector('.offcanvas-body');

function AgregarAlCarrito(){
    
    let botones=document.querySelectorAll('.agregarCarrito')
   /*  console.log(botones); */
    let contador=0
    for(let boton of botones){
        
        let nombreProducto=boton.parentElement.parentElement.querySelector('.modal-title').textContent;
     /*    console.log(nombreProducto); */
        boton.onclick=()=>{
            Agregar(nombreProducto);
        }
    }
    

}

function Agregar(nombreProducto){
    let producto=document.createElement('p');
        producto.textContent=`${nombreProducto} X1`;
        carrito.appendChild(producto);
}


function main(){
    AgregarAlCarrito()
}   

main();