// CLASES ////////////////////////
class Usuario {
    constructor(nombre,pass) {
        this.nombre = nombre
        this.pass = pass
    }
}

// VARIABLES GBLOBALES /////////////////////////
const usuarios = []

// DOM .//////////////////////////////
let btnAcceso = document.querySelector("#acceso button")

let inputsLogueo = document.querySelectorAll("#logueo input")
let inputsAcceso = document.querySelectorAll("#acceso input")
let alerta = document.querySelectorAll("p")


let btnCrearUsuario = document.querySelector("#btn-alert")


// EVENTOS .//////////////////////////////
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


        let nombreCreado = result.value.login
        let passCreado = result.value.password

        const nuevoUsuario = new Usuario(nombreCreado, passCreado)
        usuarios.push(nuevoUsuario)
        console.log(usuarios)

        /// TRANSFORMO LOS VALORES DEL ARRAY EN JSON
        const usuariosStr = JSON.stringify(usuarios)
        /// LO SETEO EN EL LOCAL STORAGE
        localStorage.setItem("usuarios", usuariosStr)
    })
})


    /// TRAIGO LOS VALORES QUE LLEVE AL LOCAL
    const traerUsuarios = localStorage.getItem("usuarios")
    // console.log(JSON.parse(traerUsuarios))
    /// EL NUEVO ARRAY QUE TRAGIO CON LOS DATOS QUE SE GUARDARON
    const usuariosArrays = JSON.parse(localStorage.getItem("usuarios"))
    //console.log(traerUsuarios)

//evento para ingresar usuario
btnAcceso.addEventListener("click",()=> {
    //variables donde se guardan los valores que se toman de los imputs
    let nombre = inputsAcceso[0].value
    let pass = inputsAcceso[1].value

    let usuario = usuariosArrays.find((elem) => {
        return elem.nombre === nombre}
    )
    //DESESTRUCTURACION DEL OBJETO QUE TRAIGO
    const {pass:passUsuario} = usuario
    
    // verifico que los datos sean correctos
    if (usuario == undefined || pass != passUsuario) {
        alertaP()
        return
    }


    // ANTES DE REDIRIGIR CON LOCATION
    // Tengo que guardar en storage para pasarle info al otro html
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