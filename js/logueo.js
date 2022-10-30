// Clases para crear los Usuarios
class Usuario {
    constructor(nombre,pass) {
        this.nombre = nombre
        this.pass = pass
    }
}

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

let btnAcceso = document.querySelector("#acceso button")
let inputsLogueo = document.querySelectorAll("#logueo input")
let inputsAcceso = document.querySelectorAll("#acceso input")
let alerta = document.querySelectorAll("p")
let btnCrearUsuario = document.querySelector("#btn-alert")

//evento para crear usuario
btnCrearUsuario.addEventListener("click", () => {
    Swal.fire({
        title: 'Nueva Cuenta',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
               <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Crear Cuenta',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!login || !password) {
                Swal.showValidationMessage(`Por favor, ingrese un Usuario y Contraseña`)
            }
            return { login: login, password: password }
        }
    }).then((result) => {
        Swal.fire(`
          Usuario: ${result.value.login}
          Contraseña: ${result.value.password}
        `.trim())

        //Creo las variables con los valores tomados en el logueo
        let nombreCreado = result.value.login
        let passCreado = result.value.password

        const nuevoUsuario = new Usuario(nombreCreado, passCreado)
        usuarios.push(nuevoUsuario)
        console.log(usuarios)

        //Transformo los Valores del Array en JSON
        const usuariosStr = JSON.stringify(usuarios)
        //Lo Seteo en el Local Storage
        localStorage.setItem("usuarios", usuariosStr)
    })
})

    //Traigo los valores que lleve al LocalStorage
    const traerUsuarios = localStorage.getItem("usuarios")
    
    //El Nuevo Array que traigo con los Datos que se Guardaron
    const usuariosArrays = JSON.parse(localStorage.getItem("usuarios"))

//evento para ingresar usuario
btnAcceso.addEventListener("click",()=> {
    //variables donde se guardan los valores que se toman de los imputs
    let nombre = inputsAcceso[0].value
    let pass = inputsAcceso[1].value

    let usuario = usuariosArrays.find((elem) => {
        return elem.nombre === nombre}
    )
    //Desestructuracion del Objeto que Traigo
    const {pass:passUsuario} = usuario
    
    // verifico que los datos sean correctos
    if (usuario == undefined || pass != passUsuario) {
        alertaP()
        return
    }

    //Antes de Redirigir con Location Tengo que guardar en Storage para pasarle info al otro html
    const usuarioPagina = JSON.stringify(usuario)
    localStorage.setItem("datos", usuarioPagina)

    location.href = "paginaEshop.html"
    console.log("Ingreso correcto");
})

function alertaP() {
    alerta.classList.add("show")

    setTimeout(()=> {
        alerta.classList.remove("show")
    },2000)
}