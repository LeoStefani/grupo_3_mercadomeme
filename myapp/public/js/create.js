window.addEventListener("load", function () {

    // funciones abreviadas para querySelector y querySelectorAll
    let qs = function (element) { return document.querySelector(element) }
    let qsa = function (element) { return document.querySelectorAll(element) }

    
    // variables 
    let productImage = qs("input[name='imgProduct']");
    let previewAvatar = qsa("img.previewAvatar");
    let submitAvatar = qs("button#submitAvatar")

    // ====================================================================================
    // ======================== PREVIEW AVATAR ============================================
    // ====================================================================================

    productImage.addEventListener("change", function (event) {


        console.log(event);

        // estoy a la espera de cambio en el input de multer en el modal
        // por defecto, el boton de cambiar foto viene deshabilitado, y solo se puede cancelar el modal
        // si se toca para seleccionar nuevo avatar, y efectivamente se selecciona uno, entonces se habilita el boton
        // de enviar el cambio y se previsualiza la foto.

        for (let i=0; i<event.srcElement.files.length; i++) {

        // FALTA VALIDAR QUE SE PUEDAN SUBIR MAXIMO 5 y MINIMO 1. Aprovechar codigo que quedo comentado para poner disabled en el boton del submit


        if (event.srcElement.files[i] != undefined) {
            previewAvatar[i].src = URL.createObjectURL(event.srcElement.files[i]);
            // submitAvatar.removeAttribute("disabled")}
        }
            // si no se selecciona foto, file es undefined, por lo que se vuelve a deshabilitar el boton de submit
        else {
            // submitAvatar.setAttribute("disabled", "true"); 
            URL.revokeObjectURL(previewAvatar[i].src)
            // en teoría esto libera el cache subido, pero no estoy seguro que este funcionando correctamente

        }
    }
    })




})