/* Esta función obtiene información de productos.json y modifica el modal existente en el html */
async function ObtenerInfo(id){
    try{
        const data= await fetch('../json/productos.json');
        const productos= await data.json();
         if( productos.hasOwnProperty(`${id}`)){
            let producto= productos[id];
            /* console.log(producto); */
            document.querySelector('#tituloModal').textContent=producto.name;
            document.querySelector('#imagenModal').src=producto.src;
            document.querySelector('#modalPrecio').textContent=`${producto.price}`;
        }
    }catch(e){
        console.log(e)
    }

}

/* Esta función escucha los botones para la generación del modal */
function EscucharBotones() {
    const botones = document.querySelectorAll('.btn-primary');
    botones.forEach(boton => {
        boton.onclick=()=>{
           let id=$(boton).attr('id');
           ObtenerInfo(id);
        }
    },false);

}

EscucharBotones();