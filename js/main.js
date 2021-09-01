
/* Defino el nodo del carrito */
const carrito= document.querySelector('.offcanvas-body');
/* Creo  array para el carrito*/
let productosCarrito=[];


/* Esta función agrega el nombre del producto al carrito y lo actualiza*/
function Agregar(nombreProducto){
    let producto=document.createElement('p');
    producto.textContent=`${nombreProducto} X1`;
    carrito.appendChild(producto);
    ActualizarCarrito(producto.textContent);
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

/* Esta función identifica todos los botones de agregar al carrito y comienza el proceso de adhesión al carro */
function AgregarAlCarrito(){
    let botones=document.querySelectorAll('.agregarCarrito')
    for(let boton of botones){
        let nombreProducto=boton.parentElement.parentElement.querySelector('.modal-title').textContent;
        boton.onclick=()=>{
            Agregar(nombreProducto);
            localStorage.setItem('productos',productosCarrito)
        }
    }
}

/*Esta función elimina, del HTML, la información relacionada al carrito */
function EliminarCarrito(){
    while(carrito.firstChild){
        carrito.removeChild(carrito.firstChild);
    }
}

/* Esta función vacia el carrito de LS */
function VaciarCarrito(){
    let botonVaciar=document.querySelector('.vaciarCarrito');
    botonVaciar.onclick=()=>{
        EliminarCarrito();
        localStorage.clear();
    }
}

/* Esta función recarga la info del carrito, si hay LS, entre las distintas páginas*/
function RecargarCarrito(){
    if(localStorage.getItem('productos')!=null){
        let productosLs;
        let arrayProd;
        productosLs=localStorage.getItem('productos');
        arrayProd=productosLs.split(',');
        for(let i=0;i<arrayProd.length;i++){
            let producto=document.createElement('p');
            producto.textContent=arrayProd[i];
            carrito.appendChild(producto);
            ActualizarCarrito(producto.textContent);
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
    AgregarAlCarrito(carrito)
    document.addEventListener('DOMContentLoaded',LeerLS())
    VaciarCarrito();
}   

main();