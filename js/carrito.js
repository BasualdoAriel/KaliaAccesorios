class Carrito{
    AgregarProducto(e){
        e.preventDefault();
        if(e.target.classListr.contains('agregarCarrito')){
            const producto=e.target.parentElement.parentElement;
            this.LeerDatosProducto(producto);
        }
    }
}





function main(){
    Carrito= new Carrito();
}