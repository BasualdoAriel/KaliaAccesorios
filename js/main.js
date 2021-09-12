
/* Defino el nodo del carrito */
const carrito= $('.offcanvas-body');
/* Creo  array para el carrito*/
let productosCarrito=[];
let contador=0;

/* Esta función agrega el nombre del producto al carrito y lo actualiza*/
function Agregar(nombreProducto){
    /* carrito.append(`<p>${nombreProducto} X1</p>`); */
    carrito.append(`<div class="row pt-2"><p class="col-8">${nombreProducto} X1</p><button id="btn${contador}"class="btn btn-danger col-4">X</button>`)
    console.log(contador);
    contador=contador+1;
    console.log(contador);
    ActualizarCarrito(`${nombreProducto}`);
}

/* Esta función verifica el estado del LocalStorage, si LS es null, devuelve array vacio. Si el LS tiene info la devuelve*/
function VerificarLocalStorage(){
    let productos;
    if(localStorage.getItem('productos')===null){
        productos=[];
    }
    else{
        productos=localStorage.getItem('productos');
    }
    return productos;
}

/* Esta función corroborar el LS y luego agrega al array del carrito la info */
function ActualizarCarrito(producto){
    productos=VerificarLocalStorage();
    productosCarrito.push(producto);
}

function ArmarToast(nombreProducto){
    $(".toast").append(`<div class="toast-body pt-0">Agregaste al carrito: ${nombreProducto}</div>`);
    $(".toast").toast('show');
}

/* Esta función identifica todos los botones de agregar al carrito y comienza el proceso de adhesión al carro */
function AgregarAlCarrito(){
    
    let botones=$('.agregarCarrito');
    for(let boton of botones){
        let nombreProducto=boton.parentElement.parentElement.querySelector('.modal-title').textContent;
        boton.onclick=()=>{
            Agregar(nombreProducto);
            localStorage.setItem('productos',productosCarrito)
            ArmarToast(nombreProducto);
        }
    }
}



/*Esta función elimina, ocualta con una animación los productos y la info del toast. luego los elimina */
function EliminarCarrito(){
    $(".offcanvas-body").slideUp('slow',()=>{
        $(".offcanvas-body").empty();
        $(".toast").children(".toast-body").remove();
        $(".offcanvas-body").slideDown('fast');
    });
}

/* Esta función vacia el carrito de LS */
function VaciarCarrito(){
    let botonVaciar=$('.vaciarCarrito');
    botonVaciar.click(function () {
        EliminarCarrito();
        localStorage.clear();
      })
}

/* Esta función recarga la info del carrito, si hay LS, entre las distintas páginas*/
function RecargarCarrito(){
    if(localStorage.getItem('productos')!=null){
        let productosLs;
        let arrayProd;
        productosLs=localStorage.getItem('productos');
        arrayProd=productosLs.split(',');
        let i=0
        for(i;i<arrayProd.length;i++){
            carrito.append($(`<div class="row pt-2"><p class="col-8">${arrayProd[i]}</p><button id="btn${i}"class="btn btn-danger col-4">X</button>`))
            ActualizarCarrito(arrayProd[i]);
        }
        contador=contador+i+1;
    }
}

/*  */
function ManejarProductosCarrito(producto){
    let arrayNuevo=[]
    for(let i=0;i<productosCarrito.length;i++){
        console.log(`${productosCarrito[i]} carrito/producto ${producto}`);
        console.table(productosCarrito);
        console.table(arrayNuevo);
        if(productosCarrito[i]!=producto){
            arrayNuevo.push(productosCarrito[i]);
        }
    }
    console.table(arrayNuevo)
    productosCarrito=arrayNuevo;
    localStorage.clear();
    localStorage.setItem('productos', arrayNuevo);


}

/* Esta función elimina un producto específico del carrito INCOMPLETA */
function  EliminarProducto(){
    let productoEliminar=$(".btn-danger");
    for(let producto of productoEliminar){
        producto.onclick=()=>{
            console.log(producto)
            let id=($(producto).attr('id'));
            /* id= id.attr('id') */
            /* console.log(id) */
            let tituloProducto= producto.parentElement.firstChild.textContent;
            console.log(productosCarrito)
            console.log(tituloProducto);
            $(`#${id}`).parent().remove();
            ManejarProductosCarrito(tituloProducto)
        }
    }
  
    
}

/* Esta función accede al LS*/
function LeerLS(){
    let productosLS;
    productosLS=VerificarLocalStorage();
    RecargarCarrito(productosLS)

}



function main(){
    $(".offcanvas-body").empty();
    AgregarAlCarrito(carrito)
    $(document).ready(LeerLS());
    EliminarProducto();
    VaciarCarrito();
}   

main();