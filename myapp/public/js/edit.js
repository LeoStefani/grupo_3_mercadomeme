

window.addEventListener("load", function () {

    let qs = function (element) { return document.querySelector(element) }
    function qsa(element) { return document.querySelectorAll(element) }


    let image = qsa("img.image");
    let buttonEdit = qsa("button.editImage");
    let buttonReset = qsa("button.resetImage");
    let input = qsa("input.editInput");

    originalImages = [];

    for (let i=0; i<5; i++) {

        originalImages[i] = image[i].src;
    }

    for (let i = 0; i < buttonEdit.length; i++) {

        buttonEdit[i].addEventListener("click", function (event) {

        input[i].click();

            input[i].addEventListener("change", function (event) {

                console.log(event);
    
                if (event.srcElement.files[0] != undefined) {
                    image[i].src = URL.createObjectURL(event.srcElement.files[0]);
                    // submitAvatar.removeAttribute("disabled")}
                }
                // si no se selecciona foto, file es undefined, por lo que se vuelve a deshabilitar el boton de submit
                else {
                    // submitAvatar.setAttribute("disabled", "true"); 
                    URL.revokeObjectURL(image[i].src);
                    // en teoría esto libera el cache subido, pero no estoy seguro que este funcionando correctamente
                }
    
            })

        });

    }

    for (let i = 0; i < buttonReset.length; i++) {

        buttonReset[i].addEventListener("click", function (event) {

            image[i].src = originalImages[i]
        })

       

    }








})