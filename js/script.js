const lista = document.querySelector("#productos")
const verCarrito = document.querySelector("#imgCarrito")
const modal = document.querySelector("#modalContainer")

let carrito = JSON.parse(localStorage.getItem("carrito")) || []

fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((producto) => {
            const contenido = document.createElement("div")
            contenido.className = "cards"
            contenido.innerHTML = `
        <h3>${producto.pelicula}</h3>
        <img src="${producto.img}"></img>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
        `
            lista.append(contenido)

            //Creo el boton de comprar
            let comprar = document.createElement("button")
            comprar.innerText = "comprar"
            comprar.className = "comprar"
            contenido.append(comprar)

            //Evento para crear el carrito de compras
            comprar.addEventListener("click", () => {

                //Busco a travez del metodo some el producto repetido por su Id
                const repetido = carrito.some((productoRepetido) => productoRepetido.id === producto.id)

                //Si Repetido da True voy a recorrer el carrito y le sumo la cantidad
                if (repetido === true) {
                    carrito.map((prod) => {
                        if (prod.id === producto.id) {
                            prod.cantidad++
                        }
                    })
                } else {
                    carrito.push({
                        id: producto.id,
                        pelicula: producto.pelicula,
                        img: producto.img,
                        precio: producto.precio,
                        cantidad: producto.cantidad
                    })
                }
                console.log(carrito)
                guardarCarrito()
            })
        });
    })

//Modal del carrito de compras
const pintarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modal = document.createElement("div")
    modal.className = "modalHeader"
    modal.innerHTML = `
    <h1 class= "modalTitulo">Carrito</h1>
    `
    modalContainer.append(modal)

    const modalButton = document.createElement("h1")
    modalButton.innerHTML = "x"
    modalButton.className = "modalHeaderButton"

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none"
    })
    modal.append(modalButton)

    //Contenido que aparece en el Carrito
    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modalContenido"
        carritoContent.innerHTML = `
        <h3>${producto.pelicula}</h3>
        <img src="${producto.img}"></img>
        <p class="precio">$${producto.precio}</p>
        <span class="restar"> ➖ </span>
        <p>Cantidad: ${producto.cantidad}</p>
        <span class="sumar"> ➕ </span>
        <p>Total: ${producto.cantidad * producto.precio}
        `
        modalContainer.append(carritoContent)

        //Evento para Restar Productos
        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener("click", () => {
            if (producto.cantidad !== 0) {
                producto.cantidad--
            }
            guardarCarrito()
            pintarCarrito()
        })

        //Evento para Sumar Productos
        let sumar = carritoContent.querySelector(".sumar")
        sumar.addEventListener("click", () => {
            producto.cantidad++
            guardarCarrito()
            pintarCarrito()
        })

        // Creo el Boton para Eliminar el Producto del Carrito
        let eliminar = document.createElement("span")
        eliminar.innerText = "❌"
        eliminar.className = "eliminarProducto"
        carritoContent.append(eliminar)
        eliminar.addEventListener("click", eliminarProductoCarrito)
    })

    //Consigo el total de la compra a traves del metodo reduce
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
    const totalCompra = document.createElement("div")
    totalCompra.className = "total"
    totalCompra.innerHTML = `
    Total a pagar: $${total}
    `
    modalContainer.append(totalCompra)


    //Boton para Finalizar la Compra
    const finalizarCompra = document.createElement("button")
    finalizarCompra.className = "finalizar"
    finalizarCompra.innerHTML = `
    Finalizar Compra
    `
    modalContainer.append(finalizarCompra)
    finalizarCompra.addEventListener("click", realizarCompra)
}

verCarrito.addEventListener("click", pintarCarrito)

const realizarCompra = () => {
    if (carrito != "") {
        Swal.fire(
            'Compra Realizada con Éxito',
            'Muchas gracias "nombre" por su compra',
            'success'
        )
    } else {
        Swal.fire(
            'Error en la compra!',
            'Debe tener productos en el Carrito',
            'error'
        )
    }
}

const eliminarProductoCarrito = () => {
    //Capturo el Id que deseo Eliminar
    const buscarId = carrito.find((element) => element.id)
    //Filtro los productos del carrito, me retorna todos los elementos que no tenga el Id seleccionado
    carrito = carrito.filter((carritoId) => {
        return carritoId !== buscarId
    })
    guardarCarrito()
    pintarCarrito()
}

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}