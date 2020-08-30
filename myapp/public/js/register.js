window.addEventListener("load", function () {

    // funciones abreviadas para querySelector y querySelectorAll
    let qs = function (element) { return document.querySelector(element) }
    let qsa = function (element) { return document.querySelectorAll(element) }

    // defino un objeto literal de errores que almacena los errores de validacion.
    let errors = {}

    // variables 
    let button = qs("button.submit");
    let form = qs("form");
    let inputMulter = qs("input[name='userImg']");
    let inputUsername = qs("input[name='userName']");
    let inputEmail = qs("input[name='userEmail']");
    let password = qs("input[name='userPassword']");
    let rePassword = qs("input[name='userRePassword']");
    let previewAvatar = qs("img.previewAvatar")

    // ====================================================================================
    // ======================== VALIDACIONES ==============================================
    // ====================================================================================

    // Agregamos evento de click en el boton de envío del formulario
    button.addEventListener("click", function (event) {

        // prevenimos el submit del formulario hasta no validarlo
        event.preventDefault();

        // ======================= MULTER CONTROL ====================================

        // Agrego evento de escucha en caso de que se intente subir un avatar
        inputMulter.addEventListener("change", function (event) {

            // Si lo que intento subir es jpg,jpeg,gif o png borra el anuncio y setea el error en 0.
            if (event.srcElement.files[0].type == undefined || event.srcElement.files[0].type == "image/jpeg" || event.srcElement.files[0].type == "image/png" || event.srcElement.files[0].type == "image/gif") {
                qs("small.multer").innerText = ""
                errors.avatar = 0
                // Si no encontro el formato que queria, setea mensaje y estado de error en el objeto errors.
            } else {
                qs("small.multer").innerText = "Formato inválido"
                errors.avatar = 1

            }
            console.log(errors.avatar);
        })

        // ======================= USERNAME CONTROL ====================================

        if (inputUsername.value.length < 3) {
            qs("small.username").innerText = "El nombre de usuario debe tener al menos 3 caracteres";
            errors.lengthUsername = 1;
        } else {
            qs("small.username").innerText = "";
            errors.lengthUsername = 0;
        }

        // ======================= EMAIL CONTROL ====================================

        // Usaremos expresiones regulares para controlar los email

        // Nombre de usuario y Servidor:

        // * Debe de empezar por letra o número.
        // * Al menos tiene una letra o número.
        // * Puede contener puntos y guiones además de las letras y números.
        // * Es por ello que [a-zA-Z0-9._-]+ hace que se repitan letras (indiferentemente mayúsculas o minúsculas), números, puntos (.), guiones bajos (_) o guiones (-). La función de los corchetes en el lenguaje de las expresiones regulares es representar «clases de caracteres», o sea, agrupar caracteres en grupos o clases. Además, el +, como ya hemos dicho antes, hace que la expresión aparezca al menos una vez.

        // En el caso del Servidor, la expresión es la misma, pero sin guion bajo: [a-zA-Z0-9.-]+

        // @:

        // Entre las dos expresiones que hemos visto anteriormente, aparece una arroba, la cual es necesaria y aparece sólo una vez.

        // Dominio:

        // Irá al final, tras un punto.
        // Podrá tener dos letras (.es, .fr, .it,…), tres letras (.com, .net, .org,..) o cuatro (.mobi, info,…).
        // Además podemos tener varios dominios seguidos (.com.ar, .com.uk,….) es por ello que deberemos de usar el modificador +. Ya que el dominio podrá aparecer varias veces.
        // Como hemos dicho, ([a-zA-Z]{2,4})+ aparece tras un punto, el cual expresamos con \. ya que debemos escapar el carácter.

        // Si queremos indicar un número concreto de caracteres lo expresamos con el número entre los operadores { y }.

        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/.test(inputEmail.value)) {
            qs("small.email").innerText = "";
            errors.invalidEmail = 0;
        } else {
            qs("small.email").innerText = "El email es inválido";
            errors.invalidEmail = 1;
        }

        // ======================= PASSWORD CONTROL ====================================

        // Verificación de que las contraseñas coincidan. Si ambas coinciden
        //  entonces setea en 0 el error de constraseña. Ademas, limpia la impresion del error en la vista.

        // Caso de que no suceda lo anterior,  setea el error de contraseña en 1 y edita el HTML para mostrar el error en la vista

        if (rePassword.value == password.value) {
            qs("small.password").innerText = "";
            qs("small.rePassword").innerText = "";
            errors.matchPassword = 0;
        } else {
            errors.matchPassword = 1;
            qs("small.password").innerText = "Las contraseñas no coinciden";
            qs("small.rePassword").innerText = "Las contraseñas no coinciden";
        }

        // para ver si estan vacías, agrego un evento que espere a que se deseleccione el campo para que no se muestren los errores de entrada


        if (password.value.length < 8) {
            qs("small.password").innerText = "la contraseña debe tener al menos ocho caracteres";
            errors.lengthPassword = 1;
        } else {
            errors.lengthPassword = 0;
            qs("small.password").innerText = "";
        }

        // ======================= ERRORS CONTROL ====================================

        // defino parametro que servirá para evaluar si todos los campos están libres de errores. 
        let okSubmit = 0;
        // se inicializa en 0 antes del for in. A medida que se encuentran errores, se suman en okSubmit.
        // Hago un forin para evaluar cada campo de error creado y ver si hay alguno con valor 1.
        for (let errorEntry in errors) {

            console.log(errors);
            if (errors[errorEntry] == 1) {
                okSubmit += 1;
            }
        }

        // Finalmente si el okSubmit es cero, quiere decir que no se sumo ningún error, entonces se ejecuta el submit
        console.log(okSubmit);
        if (okSubmit == 0) {
            form.submit()
        }


    })


    // ====================================================================================
    // ======================== PREVIEW AVATAR ============================================
    // ====================================================================================

    inputMulter.addEventListener("change", function (event) {

        console.log(event);

        // Si lo que intento subir es jpg,jpeg,gif o png borra el anuncio y setea el error en 0.
        if (event.srcElement.files[0] != undefined) {
            console.log(event);
            previewAvatar.src = URL.createObjectURL(event.srcElement.files[0])}
            
        else {
            previewAvatar.src = "/images/users/usuario.png"
            URL.revokeObjectURL(previewAvatar.src)

        }

    })




})