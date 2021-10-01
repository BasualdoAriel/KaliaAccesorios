/* Defino el nodo del carrito */
const carrito = $('.offcanvas-body');
/* Defubi ek nodo a la compra total */
const compraTotal=$('#totalCompra');
/* Creo  array para el carrito, sus precios*/
let productosCarrito = [];
let preciosCarrito = []
/* Esta variable sirve para identificar el id del boton*/
let contador=0
/* Variable al precio total */
let precioTotal = 0;

/* Esta función agrega el nombre del producto al carrito y lo actualiza*/
function Agregar(nombreProducto, precioProducto) {
    carrito.append(`<div class="row pt-2"><p class="col-4">${nombreProducto}</p><p class="col-4">$${precioProducto}</p><button id="btn${contador}"class="btn btn-danger col-4">X</button>`)
    contador = contador + 1;
    ActualizarCarrito(`${nombreProducto}`, `${precioProducto}`);
}

/* Esta función verifica el estado del LocalStorage, si LS es null, devuelve array vacio. Si el LS tiene info la devuelve,
 además modifica el ícono del carrito dependiendo si hay o no productos en el mismo*/
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

/* Esta función corrobora el LS y luego la agrega al array del carrito, lo mismo con los precios */
function ActualizarCarrito(producto, precio) {
    productos = VerificarLocalStorage('productos');
    precios = VerificarLocalStorage('precios')
    productosCarrito.push(producto);
    preciosCarrito.push(precio);
}

/* Esta función arma un toast cuando se agrega un producto al carrito */
function ArmarToast(nombreProducto) {
    $(".toast").append(`<div class="toast-body pt-0">Agregaste al carrito: ${nombreProducto}</div>`);
    $(".toast").toast('show');
}

/* Esta función identifica todos los botones de agregar al carrito y comienza el proceso de adhesión, además los añade al LS */
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



/*Esta función elimina, y oculta con una animación, los productos y la info del toast.*/
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


/* Esta función se encarga de eliminar un producto del carrito y genera los nuevos arrays del carrito actualizado*/
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


/* Esta función accede al LS y llama a RecargarCarrito()*/
function LeerLS() {
    let productosLS;
    let preciosLS;
    productosLS = VerificarLocalStorage('productos');
    preciosLS = VerificarLocalStorage('precios');
    RecargarCarrito(productosLS, preciosLS)

}


/*Esta función permite eliminar, individualmente, los productos del carrito */
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


/* Esta función recargar el carrito cada vez que se ingresa al mismo */
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

/* Función main, invoca a todas las demás. */
function main() {
    $(".offcanvas-body").empty();
    $(document).ready(LeerLS());
    ClickCarrito();
    AgregarAlCarrito(carrito)
    VaciarCarrito();
}

main();