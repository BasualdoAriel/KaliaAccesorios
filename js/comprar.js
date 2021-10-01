function CalcularPrecioFinal(listaPrecio) {
    let precios = listaPrecio.split(',');
    contador = 0;
    for (let i = 0; i < precios.length; i++) {
        contador = contador + parseInt(precios[i]);
    }
    return contador;
}

function HayProductos(productos) {
    if (productos != null) {
        return true;
    } else {
        return false;
    }
}

function MostrarCantidadProductos(productos, precios) {
    $('#cantidadProductosCarrito').append($(`<p class="nombreProducto">Agregaste un total de ${productos.length} productos y abonás: </p>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-success" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Ver detalle</button>
            
            <button type="button" class="btn btn-success" id="comprar">Comprar</button>
        </div>
        `))
    $('#precioFinal').append($(`<div class="badge rounded-pill bg-info text-dark">$ ${precios}</div>`))
    $('#comprar').click(() => {
        swal({
            title: "Gracias por tu compra!",
            text: "Pronto recibirás tus productos!",
            icon: "success",
            button: "Cerrar",
        });
        localStorage.clear();
    })
}

function Comprar() {
    let productosLS = localStorage.getItem('productos');
    let preciosLS = localStorage.getItem('precios');
    if (HayProductos(productosLS)) {
        let totalPrecio = CalcularPrecioFinal(preciosLS);
        let cantidadProductos = productosLS.split(',');
        MostrarCantidadProductos(cantidadProductos, totalPrecio);
    } else {
        $('#cantidadProductosCarrito').append($(`<p class="nombreProducto">No agregaste productos :(</p>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-success" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Ver detalle</button>
            
            <button type="button" class="btn btn-success" id="comprar">Comprar</button>
        </div>
        `))
    }

}

Comprar();