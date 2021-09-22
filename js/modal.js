async function ObtenerInfo(id){
    console.log(id)
    try{
        const data= await fetch('../json/productos.json');
        const productos= await data.json();
         if( productos.hasOwnProperty(`${id}`)){
            let producto= productos[id];
            console.log(producto);
            document.querySelector('#tituloModal').textContent=producto.name;
            document.querySelector('#imagenModal').src=producto.src;
            document.querySelector('#modalPrecio').textContent=`${producto.price}`;
        }
    }catch(e){
        console.log(e)
    }

}

function EscucharBotones() {
    const botones = document.querySelectorAll('.btn-primary');
    botones.forEach(boton => {
        boton.onclick=()=>{
           let id=$(boton).attr('id');
            /* console.log($(boton).attr('id')); */
           ObtenerInfo(id);
        }
    },false);

}

EscucharBotones();