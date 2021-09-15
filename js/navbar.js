/* INICIA NAVBAR */
function NavBarIndex(){
    $('body').prepend(`<header>
    <!-- inicio Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="images/logoOscuro.jpg" alt="logo"
            class="logo d-inline-block align-text-top"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle active tituloMenu" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                PRODUCTOS
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="sections/billeteras.html">Billeteras</a></li>
                <li><a class="dropdown-item" href="sections/ruanas.html">Ruanas</a></li>
                <li><a class="dropdown-item" href="sections/acero.html">Acero Blanco</a></li>
                <li><a class="dropdown-item" href="sections/rinioneras.html">Riñoneras</a></li>
                <li><a class="dropdown-item" href="sections/acc-pelo.html">Accesorios para el pelo</a></li>
                <li><a class="dropdown-item" href="sections/medias.html">Medias</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#envios" aria-current="page">ENVIOS</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#contacto" aria-current="page">CONTACTO</a>
            </li>
          </ul>
          <button class="btn btn-primary offcanvasBack" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><img src="images/carrito.svg"
              alt="icono de carrito de compras" class="carrito"></button>
          <div class="offcanvas offcanvas-end w-sm-100" tabindex="-1" id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel">Tu carrito</h5>
              <button type="button" class="btn-close text-reset " data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body "></div>
            <div class="offcanvas-footer">
              <button type="button" class="btn btn-dark mx-2 mb-2 vaciarCarrito">Vaciar Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>`)
}

function NavBarSection(){
    $('body').prepend(` <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="../index.html"><img src="../images/logoOscuro.jpg" alt="logo" class="logo"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle tituloMenu active" href="#" id="navbarDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                PRODUCTOS
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="../sections/billeteras.html">Billeteras</a></li>
                <li><a class="dropdown-item" href="../sections/ruanas.html">Ruanas</a></li>
                <li><a class="dropdown-item" href="../sections/acero.html">Acero Blanco</a></li>
                <li><a class="dropdown-item" href="../sections/rinioneras.html">Riñoneras</a></li>
                <li><a class="dropdown-item" href="../sections/acc-pelo.html">Accesorios para el pelo</a></li>
                <li><a class="dropdown-item" href="../sections/medias.html">Medias</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link active tituloMenu" aria-current="page" href="../index.html">HOME</a>
            </li>
          </ul>
          <button class="btn btn-primary offcanvasBack" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><img src="../images/carrito.svg"
              alt="carrito de compras" class="carrito"></button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
              <h5 id="offcanvasRightLabel">Tu carrito</h5>
              <button type="button" class="btn-close text-reset " data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div class="offcanvas-body ">
            </div>
            <div class="offcanvas-footer">
              <button type="button" class="btn btn-dark mx-2 mb-2 vaciarCarrito">Vaciar Carrito</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>`)
}

function VerificarTitulo(){
    let titulo=document.title
    if(titulo ==="Kalia Accesorios | Encontrá eso que estabas buscando!"){
        NavBarIndex();
    }else{
        NavBarSection();
    }
}

VerificarTitulo();