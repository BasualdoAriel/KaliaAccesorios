/* Defino el nodo del carrito */
const carrito = $('.offcanvas-body');
const compraTotal=$('#totalCompra');
/* Creo  array para el carrito*/
let productosCarrito = [];
let preciosCarrito = []
let contador=0
let precioTotal = 0;

/* Esta función agrega el nombre del producto al carrito y lo actualiza*/
function Agregar(nombreProducto, precioProducto) {
    carrito.append(`<div class="row pt-2"><p class="col-4">${nombreProducto}</p><p class="col-4">$${precioProducto}</p><button id="btn${contador}"class="btn btn-danger col-4">X</button>`)
    contador = contador + 1;
    ActualizarCarrito(`${nombreProducto}`, `${precioProducto}`);
}

/* Esta función verifica el estado del LocalStorage, si LS es null, devuelve array vacio. Si el LS tiene info la devuelve*/
function VerificarLocalStorage(itemAVerificar) {
    let data;
    if (localStorage.getItem(`${itemAVerificar}`) === null) {
        data = [];
        if(document.title ==="Kalia Accesorios | Encontrá eso que estabas buscando!"){
            document.querySelector('.carrito').src="images/carrito.svg"
        }else{
            document.querySelector('.carrito').src="../images/carrito.svg"
        }
    } else {
        data = localStorage.getItem(`${itemAVerificar}`);
        if(document.title ==="Kalia Accesorios | Encontrá eso que estabas buscando!"){
            document.querySelector('.carrito').src="images/carritolleno.png"
        }else{
            document.querySelector('.carrito').src="../images/carritolleno.png"
        }
    }
    return data;
}

/* Esta función corroborar el LS y luego agrega al array del carrito la info */
function ActualizarCarrito(producto, precio) {
    productos = VerificarLocalStorage('productos');
    precios = VerificarLocalStorage('precios')
    productosCarrito.push(producto);
    preciosCarrito.push(precio);
}

function ArmarToast(nombreProducto) {
    $(".toast").append(`<div class="toast-body pt-0">Agregaste al carrito: ${nombreProducto}</div>`);
    $(".toast").toast('show');
}

/* Esta función identifica todos los botones de agregar al carrito y comienza el proceso de adhesión al carro */
function AgregarAlCarrito() {
    let botones = $('.agregarCarrito');
    for (let boton of botones) {
        boton.onclick = () => {
            let nombreProducto = document.querySelector('#tituloModal').textContent
            let precioProducto = document.querySelector('#modalPrecio').textContent;
            Agregar(nombreProducto, precioProducto);
            localStorage.setItem('productos', productosCarrito)
            localStorage.setItem('precios', preciosCarrito)
            ArmarToast(nombreProducto);
        }
    }
}



/*Esta función elimina, ocualta con una animación los productos y la info del toast. luego los elimina */
function EliminarCarrito() {
    $(".offcanvas-body").slideUp('slow', () => {
        $(".offcanvas-body").empty();
        $(".toast").children(".toast-body").remove();

        $(".offcanvas-body").slideDown('fast');
    });
}

/* Esta función vacia el carrito de LS */
function VaciarCarrito() {
    let botonVaciar = $('.vaciarCarrito');
    botonVaciar.click(function () {
        EliminarCarrito();
        localStorage.clear();
        productosCarrito = [];
    })
}

/* Esta función recarga la info del carrito, si hay LS, entre las distintas páginas*/
function RecargarCarrito(arrayProductos, arrayPrecios) {
    let precio=0
    if (arrayProductos.length > 0) {
        let newArrayProd = arrayProductos.split(',');
        let newArrayPrec = arrayPrecios.split(',')
        for (let i=0; i < newArrayProd.length; i++) {
            carrito.append($(`<div class="row pt-2"><p class="col-4">${newArrayProd[i]}</p><p class="col-4"> $${newArrayPrec[i]}</p><button id="btn${i}"class="btn btn-danger col-4">X</button>`))
            ActualizarCarrito(newArrayProd[i], newArrayPrec[i]);
            console.log(`---${precioTotal}+${newArrayPrec[i]}---`)
            precio=precio+(parseInt(newArrayPrec[i]));
        }
    }else{
        productosCarrito=[];
        preciosCarrito=[];
        localStorage.clear();
    }
    precioTotal=precio;
    compraTotal.append($(`<p class="precioFinal">$ ${precioTotal}</p>`))
}

function ManejarProductosCarrito(producto) {
    let arrayNuevoProductos = []
    let arrayNuevoPrecios=[]
    let preciosActualizados=0
    for (let i = 0; i < productosCarrito.length; i++) {
        if (productosCarrito[i] != producto) {
            arrayNuevoProductos.push(productosCarrito[i]);
            arrayNuevoPrecios.push(preciosCarrito[i])
            preciosActualizados=preciosActualizados+(parseInt(preciosCarrito[i]))
        }
    }
    productosCarrito = arrayNuevoProductos;
    preciosCarrito=arrayNuevoPrecios;
    localStorage.clear();
    localStorage.setItem('productos', arrayNuevoProductos);
    localStorage.setItem('precios',arrayNuevoPrecios);
    precioTotal=preciosActualizados;
    compraTotal.empty();
    compraTotal.append($(`<p class="precioFinal">$ ${precioTotal}</p>`));
    
}


/* Esta función accede al LS*/
function LeerLS() {
    let productosLS;
    let preciosLS;
    productosLS = VerificarLocalStorage('productos');
    preciosLS = VerificarLocalStorage('precios');
    RecargarCarrito(productosLS, preciosLS)

}
/* Finaliza Carrito */

function EliminarProducto() {
    const productoEliminar=document.querySelectorAll('.btn-danger');
    for (let producto of productoEliminar) {
        producto.onclick = () => {
            console.log(producto)
            let id = ($(producto).attr('id'));
            let tituloProducto = producto.parentElement.firstChild.textContent;
            $(`#${id}`).parent().remove();
            ManejarProductosCarrito(tituloProducto)
        
        }
    }            
}

function ClickCarrito(){
    const botonCarrito=document.querySelector('.offcanvasBack');
    botonCarrito.onclick=()=>{
        $(".offcanvas-body").empty();
        productosCarrito = [];
        preciosCarrito = []
        compraTotal.empty();
        LeerLS();
        EliminarProducto();
    }
}


function main() {
    $(".offcanvas-body").empty();
    $(document).ready(LeerLS());
    ClickCarrito();
    AgregarAlCarrito(carrito)
    VaciarCarrito();
}

main();