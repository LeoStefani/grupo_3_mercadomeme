window.addEventListener("load", function () {

    // funciones abreviadas para querySelector y querySelectorAll
    let qs = function (element) { return document.querySelector(element) }
    let qsa = function (element) { return document.querySelectorAll(element) }

    
    // variables 
    let inputMulter = qs("input[name='avatar']");
    let previewAvatar = qs("img.previewAvatar");
    let submitAvatar = qs("button#submitAvatar");
    let deleteButtons = qsa("button.btn-danger");

    // ====================================================================================
    // ======================== PREVIEW AVATAR ============================================
    // ====================================================================================

    inputMulter.addEventListener("change", function (event) {

        console.log(event);

        // estoy a la espera de cambio en el input de multer en el modal
        // por defecto, el boton de cambiar foto viene deshabilitado, y solo se puede cancelar el modal
        // si se toca para seleccionar nuevo avatar, y efectivamente se selecciona uno, entonces se habilita el boton
        // de enviar el cambio y se previsualiza la foto.

        if (event.srcElement.files[0] != undefined) {
            previewAvatar.src = URL.createObjectURL(event.srcElement.files[0]);
            submitAvatar.removeAttribute("disabled")}
            // si no se selecciona foto, file es undefined, por lo que se vuelve a deshabilitar el boton de submit
        else {
            submitAvatar.setAttribute("disabled", "true"); 
            URL.revokeObjectURL(previewAvatar.src)
            // en teoría esto libera el cache subido, pero no estoy seguro que este funcionando correctamente

        }

    })

    for (let i = 0; i < deleteButtons.length; i++) {

    

        deleteButtons[i].addEventListener("click", function (event) {

            event.preventDefault();

            console.log(event.toElement.form.id);

         var form = qs("form#"+event.toElement.form.id);


             Swal.fire({
                title: 'Eliminar',
                text: "¿Estás seguro?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!',
                cancelButtonText: 'Cancelar',
                            }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                    '',
                    'success'
                  );

                form.submit()

                }})

        
        
    })
}





})