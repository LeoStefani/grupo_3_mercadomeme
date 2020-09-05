window.addEventListener("load", function () {

    let qs = function (element) { return document.querySelector(element) }
    function qsa(element) { return document.querySelectorAll(element) }

    let image = qsa("img.image");
    let buttonEdit = qsa("button.editImage");
    let input = qsa("input.editInput");

    let originalImages = [];

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
                    image[i].src = originalImages[i];
                    // en teoría esto libera el cache subido, pero no estoy seguro que este funcionando correctamente
                }
    
            })

        });

    }

    // ============ VALIDATIONS ============
    
    let createForm = qs('form#createForm');

    let inputName = qs('#productNewName');
    let errorName = qs('small#errorName');

    let inputPrice = qs('#productNewPrice');
    let errorPrice = qs('small#errorPrice');

    let inputDescription = qs('#productNewDescription');
    let errorDescription = qs('small#errorDescription');

    // let inputMainImage = qs('#img0');
    // let errorImage = qs('#img0');

    let createErrors = {};

    let stringRegEx =  /^[a-z\s]+$/i;
    let numberRegEx = /^[0-9]+([,.][0-9]+)?$/g;


    //Name validation
    inputName.addEventListener('blur', function() {        
        delete createErrors.name;
        if(!inputName.value.length > 0) {
            createErrors.name = "Debés ingresar un nombre de producto";
        } else if(!inputName.value.match(stringRegEx)) {
            createErrors.name = "El nombre de producto debe ser de tipo texto";
        }
        errorName.innerText = (createErrors.name) ? createErrors.name : '';
    });

    //Price validation
    inputPrice.addEventListener('blur', function() {        
        delete createErrors.price;
        if(!inputPrice.value.length > 0) {
            createErrors.price = "Debés ingresar un precio de producto válido";
        } else if(!inputPrice.value.match(numberRegEx)) {
            createErrors.price = "El precio del producto debe ser numérico";
        }
        errorPrice.innerText = (createErrors.price) ? createErrors.price : '';
    });

    //Description validation
    inputDescription.addEventListener('blur', function() {        
        delete createErrors.description;
        if(!(inputDescription.value.length > 0 && inputDescription.value.length < 501)) {
            createErrors.description = "Debés ingresar una descripción del producto y no puede tener mas de 500 caracteres";
        } 
        errorDescription.innerText = (createErrors.description) ? createErrors.description : '';
    });


    createForm.addEventListener('submit', event => {
        event.preventDefault();
        //Busco y checkeo que haya al menos un color checkeado.
        let colorContainer = qsa('.createColorCheckbox');
        let colorContainerChecked = false;
        for (let i = 0; i < colorContainer.length; i++) {
            if(colorContainer[i].checked) {
                colorContainerChecked = true;
                break;
            };
        }

        //Busco y checkeo que haya al menos un size checkeado.
        let sizeContainer = qsa('.createsizeCheckbox');
        let sizeContainerChecked = false;
        for (let i = 0; i < sizeContainer.length; i++) {
            if(sizeContainer[i].checked) {
                sizeContainerChecked = true;
                break;
            };
        }
        let inputSizeXsCheck = qs('input#XS');
        let inputSizeXsValue = qs('input#xsInput');
        let inputSizeSCheck = qs('input#S');
        let inputSizeSValue = qs('input#sInput');
        let inputSizeMCheck = qs('input#M');
        let inputSizeMValue = qs('input#mInput');
        let inputSizeLCheck = qs('input#L');
        let inputSizeLValue = qs('input#lInput');
        let inputSizeXlCheck = qs('input#XL');
        let inputSizeXlValue = qs('input#xlInput');

        let xsValidation = (inputSizeXsCheck.checked && inputSizeXsValue.value.length > 0 && inputSizeXsValue.value.match(numberRegEx));
        // let sValidation = (inputSizeSCheck.checked && inputSizeSValue.value.length > 0 && inputSizeSValue.value.match(numberRegEx));
        // let mValidation = (inputSizeMCheck.checked && inputSizeMValue.value.length > 0 && inputSizeMValue.value.match(numberRegEx));
        // let lValidation = (inputSizeLCheck.checked && inputSizeLValue.value.length > 0 && inputSizeLValue.value.match(numberRegEx));
        // let xlValidation = (inputSizeXlCheck.checked && inputSizeXlValue.value.length > 0 && inputSizeXlValue.value.match(numberRegEx));



        if (inputName.value.length > 0 && inputPrice.value.length > 0 && inputDescription.value.length > 0 && Object.keys(createErrors).length == 0 && colorContainerChecked && sizeContainerChecked && xsValidation ) { 
            createForm.submit();
        } else { 
            console.log("mal");
        };

    })

    // ============ VALIDATIONS ============
    
       
})