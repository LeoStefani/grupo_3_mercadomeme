function sizeValidator(inputCheck, inputValue) {
    if (inputCheck.checked) {
        if(inputValue.length > 0 && inputValue.match(numberRegEx)) {
            return true;
        } else {
            return false;
        };
    } else {
        return false;
    }; 
}

let stringRegEx =  /^[a-z\s]+$/i;
let numberRegEx = /^[0-9]+([,.][0-9]+)?$/g;


window.addEventListener("load", function () {

    let qs = function (element) { return document.querySelector(element) }
    function qsa(element) { return document.querySelectorAll(element) }


    let image = qsa("img.image");
    let buttonEdit = qsa("button.editImage");
    let buttonReset = qsa("button.resetImage");
    let input = qsa("input.editInput");

    let originalImages = [];

    for (let i=0; i<5; i++) {

        originalImages[i] = image[i].src;
    };

    // imgValidator es el flag para asegurarse que haya al menos una img...
    let imgValidator = [true, false, false, false, false];

    for (let i = 0; i < buttonEdit.length; i++) {

        buttonEdit[i].addEventListener("click", function (event) {

        input[i].click();

            input[i].addEventListener("change", function (event) {

                console.log(event);
    
                if (
                    true
                    // event.srcElement.files[0] != undefined && (input[i].files[0].type.slice(6) === 'jpeg' || input[i].files[0].type.slice(6) === 'jpg' || input[i].files[0].type.slice(6) === 'png' || input[i].files[0].type.slice(6) === 'gif')
                    ) {
                    image[i].src = URL.createObjectURL(event.srcElement.files[0]);
                    imgValidator[i] = true;
                    errorImages.innerText = '';
                } 
                else if (event.srcElement.files[0] != undefined && !(input[i].files[0].type.slice(6) === 'jpeg' || input[i].files[0].type.slice(6) === 'jpg' || input[i].files[0].type.slice(6) === 'png' || input[i].files[0].type.slice(6) === 'gif')) {
                    errorImages.innerText = 'Ingresa un formato de imagen válido (jpeg, jpg, png, gif)';
                }
                // si no se selecciona foto, file es undefined, por lo que se vuelve a deshabilitar el boton de submit
                else {
                    URL.revokeObjectURL(image[i].src);
                    imgValidator[i] = false;
                    
                    // en teoría esto libera el cache subido, pero no estoy seguro que este funcionando correctamente
                }
            })
        });
    }
    console.log(imgValidator);

    for (let i = 0; i < buttonReset.length; i++) {

        buttonReset[i].addEventListener("click", function (event) {

            image[i].src = originalImages[i]
        })
    };


    // ============ VALIDATIONS ============
    
    let editForm = qs('form#editForm');

    let inputName = qs('#productEditName');
    let errorName = qs('small#errorName');

    let inputPrice = qs('#productEditPrice');
    let errorPrice = qs('small#errorPrice');

    let inputDescription = qs('#productEditDescription');
    let errorDescription = qs('small#errorDescription');

    let createErrors = {};

    //Name validation
    inputName.addEventListener('blur', function() {        
        delete createErrors.name;
        if(!(inputName.value.length > 4)) {
            createErrors.name = "Debés ingresar un nombre de producto de al menos 5 caracteres";
        } else if(!inputName.value.match(stringRegEx)) {
            createErrors.name = "El nombre de producto debe ser de tipo texto";
        }
        errorName.innerText = (createErrors.name) ? createErrors.name : '';
    });

    //Price validation
    inputPrice.addEventListener('blur', function() {        
        delete createErrors.price;
        if(!(inputPrice.value.length > 0)) {
            createErrors.price = "Debés ingresar un precio de producto válido";
        } else if(!inputPrice.value.match(numberRegEx)) {
            createErrors.price = "El precio del producto debe ser numérico";
        }
        errorPrice.innerText = (createErrors.price) ? createErrors.price : '';
    });

    //Description validation
    inputDescription.addEventListener('blur', function() {        
        delete createErrors.description;
        if(!(inputDescription.value.length > 19 && inputDescription.value.length < 501)) {
            createErrors.description = "Debés ingresar una descripción del producto de entre 20 y 500 caracteres";
        } 
        errorDescription.innerText = (createErrors.description) ? createErrors.description : '';
    });


    editForm.addEventListener('submit', event => {
        event.preventDefault();

        //Busco y checkeo que haya al menos un color checkeado.
        let colorContainer = qsa('.editColorCheckbox');
        let colorContainerChecked = false;
        for (let i = 0; i < colorContainer.length; i++) {
            if(colorContainer[i].checked) {
                colorContainerChecked = true;
                break;
            };
        }

        //Busco y checkeo que haya al menos un size checkeado.
        let sizeContainer = qsa('.editSizeCheckbox');
        let sizeContainerChecked = false;
        for (let i = 0; i < sizeContainer.length; i++) {
            if(sizeContainer[i].checked) {
                sizeContainerChecked = true;
                break;
            };
        }

        // El siguiente bloque valida caso por caso que si está checkeado un tamaño, tengo un valor correcto.
        let sizesValidations = {
            inputSizeXsCheck : qs('input#XS'),
            inputSizeXsValue : qs('input#xsInput'),
            inputSizeSCheck : qs('input#S'),
            inputSizeSValue : qs('input#sInput'),
            inputSizeMCheck : qs('input#M'),
            inputSizeMValue : qs('input#mInput'),
            inputSizeLCheck : qs('input#L'),
            inputSizeLValue : qs('input#lInput'),
            inputSizeXlCheck : qs('input#XL'),
            inputSizeXlValue : qs('input#xlInput')
        };



        let xsValidation = true;
        xsValidation = sizeValidator(sizesValidations.inputSizeXsCheck, sizesValidations.inputSizeXsValue.value);
        // if (sizesValidations.inputSizeXsCheck.checked) {
        //     if(sizesValidations.inputSizeXsValue.value.length > 0 && sizesValidations.inputSizeXsValue.value.match(numberRegEx)) {
        //         xsValidation = true;
        //     } else {
        //         xsValidation = false;
        //     };
        // };

        let sValidation = true;
        sValidation = sizeValidator(sizesValidations.inputSizeSCheck, sizesValidations.inputSizeSValue.value);
        // if (sizesValidations.inputSizeSCheck.checked) {
        //     if(sizesValidations.inputSizeSValue.value.length > 0 && sizesValidations.inputSizeSValue.value.match(numberRegEx)) {
        //         sValidation = true;
        //     } else {
        //         sValidation = false;
        //     };
        // };


        let mValidation = true;
        mValidation = sizeValidator(sizesValidations.inputSizeMCheck, sizesValidations.inputSizeMValue.value);
        // if (sizesValidations.inputSizeMCheck.checked) {
        //     if(sizesValidations.inputSizeMValue.value.length > 0 && sizesValidations.inputSizeMValue.value.match(numberRegEx)) {
        //         mValidation = true;
        //     } else {
        //         mValidation = false;
        //     };
        // };


        let lValidation = true;
        lValidation = sizeValidator(sizesValidations.inputSizeLCheck, sizesValidations.inputSizeLValue.value);
        // if (sizesValidations.inputSizeLCheck.checked) {
        //     if(sizesValidations.inputSizeLValue.value.length > 0 && sizesValidations.inputSizeLValue.value.match(numberRegEx)) {
        //         lValidation = true;
        //     } else {
        //         lValidation = false;
        //     };
        // };


        let xlValidation = true;
        xlValidation = sizeValidator(sizesValidations.inputSizeXlCheck, sizesValidations.inputSizeXlValue.value);
        // if (sizesValidations.inputSizeXlCheck.checked) {
        //     if(sizesValidations.inputSizeXlValue.value.length > 0 && sizesValidations.inputSizeXlValue.value.match(numberRegEx)) {
        //     xlValidation = true;
        //     } else {
        //     xlValidation = false;
        //     };
        // };


        let finalErrors = qs('small#finalErrors');


        // Bloque final, recopila todas las validaciones, si esta todo Ok hace el submit, sino imprime un error.
        if (
            true
            // inputName.value.length > 0 && inputPrice.value.length > 0 && inputDescription.value.length > 0 && Object.keys(createErrors).length == 0 && colorContainerChecked && sizeContainerChecked && xsValidation && sValidation && mValidation && lValidation && xlValidation && imgValidator.includes(true)
            ) { 
            editForm.submit();
        } else { 
            finalErrors.innerText = 'Debes completar todos los campos requeridos y cargar al menos un tamaño, un color, y una imagen del producto';
        };

    })

    // ============ VALIDATIONS ============

})