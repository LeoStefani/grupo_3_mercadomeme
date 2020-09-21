
window.addEventListener("load", function () {

    var qs = function (element) { return document.querySelector(element) }
    var qsa = function (element) { return document.querySelectorAll(element) }


    let memeToComplete = qs("img.memeToComplete");
    let memeCategory = qsa("img.memeCategory");
    let upperText = qs("p.upperText");
    let lowerText = qs("p.lowerText");
    let upperTextInput = qs("input[name='upperText']");
    let lowerTextInput = qs("input[name='lowerText']");
    let buttonColorToggle = qsa("button.colorToggle");
    let buttonDown = qsa("button.down");
    let buttonUp = qsa("button.up");
    let buttonLeft = qsa("button.left");
    let buttonRight = qsa("button.right");
    let buttonStart = qsa("button.start")
    let buttonCenter = qsa("button.center");
    let buttonEnd = qsa("button.end")
    let buttonMoreSpacing = qsa("button.moreSpacing");
    let buttonLessSpacing = qsa("button.lessSpacing");
    let buttonReset = qsa("button.reset");
    let buttonCompress = qsa("button.compress");
    let buttonRotateRight = qsa("button.rotateRight");
    let buttonRotateLeft = qsa("button.rotateLeft");


    let upperTextInitialPosition = 15;
    let upperTextInitialSpacing = 2;
    let upperTextInitialHorizontal = 50;
    let upperTextInitialAngle = 0;


    let lowerTextInitialPosition = 75;
    let lowerTextInitialSpacing = 2;
    let lowerTextInitialHorizontal = 50;
    let lowerTextInitialAngle = 0;




    // ======================================MEME TO COMPLETE SELECTION========================================================


    for (let i = 0; i < memeCategory.length; i++) {
        memeCategory[i].addEventListener("click", function (event) {
            memeToComplete.src = event.srcElement.currentSrc
        })
    }

    // ======================================UPPER TEXT========================================================

    buttonColorToggle[0].addEventListener("click", function (event) {
        // console.log(event);
        upperText.classList.toggle("dark");

    })

    buttonCompress[0].addEventListener("click", function (event) {
        upperText.classList.toggle("w-100");
        upperText.classList.toggle("w-50");
    })

    buttonDown[0].addEventListener("click", function (event) {
        upperTextInitialPosition += 2.5
        if (upperTextInitialPosition < 95) { upperText.style.top = upperTextInitialPosition + "%" }
        else { upperTextInitialPosition = 95 }

        upperText.style.top = upperTextInitialPosition + "%"
    })

    buttonUp[0].addEventListener("click", function (event) {
        upperTextInitialPosition -= 2.5
        if (upperTextInitialPosition > 2.5) { upperText.style.top = upperTextInitialPosition + "%" }
        else { upperTextInitialPosition = 2.5 }


    })

    buttonLeft[0].addEventListener("click", function (event) {

        upperTextInitialHorizontal -= 3
        if (upperTextInitialHorizontal > 20) { upperText.style.left = upperTextInitialHorizontal + "%" }
        else { upperTextInitialHorizontal = 20 }
    })

    buttonRight[0].addEventListener("click", function (event) {

        upperTextInitialHorizontal += 3;
        if (upperTextInitialHorizontal < 80) { upperText.style.left = upperTextInitialHorizontal + "%" }
        else { upperTextInitialHorizontal = 80 }
    })

    // buttonLeft[0].addEventListener("click", function (event) {
    //     upperText.innerText += "\u00A0";
    // })

    // buttonRight[0].addEventListener("click", function (event) {
    //     upperText.insertAdjacentText('afterbegin', "\u00A0")
    // })

    buttonRotateRight[0].addEventListener("click", function (event) {
        upperTextInitialAngle += 3;
        upperText.style.transform = `translate(-50%, -50%) rotate(${upperTextInitialAngle}deg)`;

    })

    buttonRotateLeft[0].addEventListener("click", function (event) {
        upperTextInitialAngle -= 3;
        upperText.style.transform = `translate(-50%, -50%) rotate(${upperTextInitialAngle}deg)`;

    })

    buttonStart[0].addEventListener("click", function (event) {

        upperText.classList.add("text-left");

        if (upperText.classList.contains("text-center")) {

            upperText.classList.remove("text-center");

        }

        if (upperText.classList.contains("text-right")) {

            upperText.classList.remove("text-right");

        }
    })

    buttonCenter[0].addEventListener("click", function (event) {

        upperText.classList.add("text-center");

        if (upperText.classList.contains("text-right")) {

            upperText.classList.remove("text-right");

        }

        if (upperText.classList.contains("text-left")) {

            upperText.classList.remove("text-left");

        }
    })

    buttonEnd[0].addEventListener("click", function (event) {

        upperText.classList.add("text-right");

        if (upperText.classList.contains("text-center")) {

            upperText.classList.remove("text-center");

        }

        if (upperText.classList.contains("text-left")) {

            upperText.classList.remove("text-left");

        }
    })

    buttonMoreSpacing[0].addEventListener("click", function (event) {
        upperTextInitialSpacing += 1;
        if (upperTextInitialSpacing < 20) { upperText.style.wordSpacing = upperTextInitialSpacing + "px" }
        else { upperTextInitialSpacing = 20 }
    })

    buttonLessSpacing[0].addEventListener("click", function (event) {
        upperTextInitialSpacing -= 1;
        if (upperTextInitialSpacing > -5) { upperText.style.wordSpacing = upperTextInitialSpacing + "px" }
        else { upperTextInitialSpacing = -5 }
    })

    buttonReset[0].addEventListener("click", function (event) {
        upperText.style.transform = "translate(-50%, -50%) rotate(0deg)";
        upperTextInitialHorizontal = 50;
        upperText.style.left = "50%"
        upperTextInput.value = ""
        upperText.innerText = "TEXTO SUPERIOR"
        upperTextInitialPosition = 15;
        upperTextInitialSpacing = 2;
        upperText.style.wordSpacing = "2px";
        upperText.style.top = "15%"
        upperText.classList.add("text-center");
        if (upperText.classList.contains("text-right")) {
            upperText.classList.remove("text-right");
        }
        if (upperText.classList.contains("text-left")) {
            upperText.classList.remove("text-left");
        }
    })

    upperTextInput.addEventListener("keyup", function (event) {
        upperText.innerText = event.srcElement.value;
    })

    // ======================================LOWER TEXT========================================================

    buttonColorToggle[1].addEventListener("click", function (event) {
        console.log(event);
        lowerText.classList.toggle("dark");

    })

    buttonCompress[1].addEventListener("click", function (event) {
        lowerText.classList.toggle("w-100");
        lowerText.classList.toggle("w-50");
    })

    buttonDown[1].addEventListener("click", function (event) {
        lowerTextInitialPosition += 2.5
        if (lowerTextInitialPosition < 97.5) { lowerText.style.top = lowerTextInitialPosition + "%" }
        else { lowerTextInitialPosition = 97.5 }
    })

    buttonUp[1].addEventListener("click", function (event) {
        lowerTextInitialPosition -= 2.5
        if (lowerTextInitialPosition > 2.5) { lowerText.style.top = lowerTextInitialPosition + "%" }
        else { lowerTextInitialPosition = 2.5 }
    })

    buttonLeft[1].addEventListener("click", function (event) {

        lowerTextInitialHorizontal -= 3
        if (lowerTextInitialHorizontal > 20) { lowerText.style.left = lowerTextInitialHorizontal + "%" }
        else { lowerTextInitialHorizontal = 20 }
    })

    buttonRight[1].addEventListener("click", function (event) {

        lowerTextInitialHorizontal += 3
        if (lowerTextInitialHorizontal < 80) { lowerText.style.left = lowerTextInitialHorizontal + "%" }
        else { lowerTextInitialHorizontal = 80 }
    })

    // buttonLeft[1].addEventListener("click", function (event) {
    //     lowerText.innerText += "\u00A0";
    // })

    // buttonRight[1].addEventListener("click", function (event) {
    //     lowerText.insertAdjacentText('afterbegin', "\u00A0")
    // })

    buttonRotateRight[1].addEventListener("click", function (event) {
        lowerTextInitialAngle += 3;
        lowerText.style.transform = `translate(-50%, -50%) rotate(${lowerTextInitialAngle}deg)`;

    })

    buttonRotateLeft[1].addEventListener("click", function (event) {
        lowerTextInitialAngle -= 3;
        lowerText.style.transform = `translate(-50%, -50%) rotate(${lowerTextInitialAngle}deg)`;

    })

    buttonStart[1].addEventListener("click", function (event) {

        lowerText.classList.add("text-left");

        if (lowerText.classList.contains("text-center")) {

            lowerText.classList.remove("text-center");

        }

        if (lowerText.classList.contains("text-right")) {

            lowerText.classList.remove("text-right");

        }
    })

    buttonCenter[1].addEventListener("click", function (event) {

        lowerText.classList.add("text-center");

        if (lowerText.classList.contains("text-right")) {

            lowerText.classList.remove("text-right");

        }

        if (lowerText.classList.contains("text-left")) {

            lowerText.classList.remove("text-left");

        }
    })

    buttonEnd[1].addEventListener("click", function (event) {

        lowerText.classList.add("text-right");

        if (lowerText.classList.contains("text-center")) {

            lowerText.classList.remove("text-center");

        }

        if (lowerText.classList.contains("text-left")) {

            lowerText.classList.remove("text-left");

        }
    })

    buttonMoreSpacing[1].addEventListener("click", function (event) {

        lowerTextInitialSpacing += 1;
        if (lowerTextInitialSpacing < 20) { lowerText.style.wordSpacing = lowerTextInitialSpacing + "px" }
        else { lowerTextInitialSpacing = 20 }
    })

    buttonLessSpacing[1].addEventListener("click", function (event) {
        lowerTextInitialSpacing -= 1;
        if (lowerTextInitialSpacing > -5) { lowerText.style.wordSpacing = lowerTextInitialSpacing + "px" }
        else { lowerTextInitialSpacing = -5 }
    })

    buttonReset[1].addEventListener("click", function (event) {
        lowerText.style.transform = "translate(-50%, -50%) rotate(0deg)";
        lowerTextInitialHorizontal = 50;
        lowerText.style.left = "50%"
        lowerTextInput.value = ""
        lowerText.innerText = "TEXTO INFERIOR"
        lowerTextInitialPosition = 75
        lowerTextInitialSpacing = 2
        lowerText.style.wordSpacing = "2px";
        lowerText.style.top = "75%"
        lowerText.classList.add("text-center");
        if (lowerText.classList.contains("text-right")) {
            lowerText.classList.remove("text-right");
        }
        if (lowerText.classList.contains("text-left")) {
            lowerText.classList.remove("text-left");
        }
    })

    lowerTextInput.addEventListener("keyup", function (event) {
        lowerText.innerText = event.srcElement.value;
    })


    // ========================================================================================================

    let buttonScreenshot = qs("button#screenshot");
    let divCapture = qs("div#capture");

    // Con esta funcion auxiliar que encontré, se puede saber al posición de donde arranca el div:

    function offset(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    buttonScreenshot.addEventListener("click", function (event) {

        // las coordenadas left y top surjen de aplicar la funcion anterior:

        var divOffset = offset(divCapture);
        let left = parseInt(divOffset.left);
        let top = parseInt(divOffset.top);

        // por otro lado, saco el ancho y alto del div que contiene el meme:

        let memeWidth = memeToComplete.width;
        let memeHeight = memeToComplete.height;

        // por otro lado, para que quede bien, depende de la disposición de los elementos con responsive para que se acomode bien.
        // Por eso defino una variable que depende del ancho de la ventana para agregar un pequeño corrimiento de corrección:

        let offsetLeft = left;

        if (window.innerWidth < 768) {
            offsetLeft += 2;
        } else {
            offsetLeft += 7;
        }

        // Lo mismo para ajustar el ancho del canvas que se va a generar:

        let finalWidth = memeWidth;

        if (window.innerWidth < 768) {
            finalWidth += 0;
        } else {
            finalWidth += 2;
        }

        // Aplico la funcionalidad de HTML2CANVAS. 

        // AllowTaint es necesario porque como leo de la API, cambia la estructura del source y sino no lo leia.
        // El alto funciona bien con el alto del div, lo mismo que la posicion del corte inicial.
        // Para el ancho, le paso el corte y el ancho corregidos que setee con offsetLeft y finalWidth

        // Sin el cors no podía guardar como imagen el cavnas tainted, es decir que usaba imágenes leíadas de la api.

        // Luego de generado el canvas, lo que hago es 

        function srcToFile(src, fileName, mimeType) {
            return (fetch(src)
                .then(function (res) { return res.arrayBuffer(); })
                .then(function (buf) { return new File([buf], fileName, { type: mimeType }); })
            );
        }

        html2canvas(document.querySelector("#capture"), { backgroundColor: null, useCORS: true, allowTaint: true, width: finalWidth, height: memeHeight, y: top, x: offsetLeft }).then(canvas => {
            return canvas
        })
            .then(result => {
                let memeGenerated = Canvas2Image.convertToPNG(result, finalWidth, memeHeight)

                srcToFile(
                    memeGenerated.src,
                    'meme.png',
                    'image/png'
                )
                    .then(function (file) {
                        console.log(file);
                        var fd = new FormData();
                        fd.append("file", file);

                        return fetch('/memes', { method: 'POST', body: fd });
                    })
                    .then(function (res) {
                        return res.text();
                    })
                    .then(console.log)
                    .catch(console.error);
            })
            // .then(function (final) {
                                // location.href = "/memes";

            // })
        // .then(meme => {
        //     fetch("/memes", {
        //         method: 'POST',
        //         body: { userMeme: meme },
        //         headers: {
        //                            },
        //     }).then(function (response) {
        //         console.log('11');
        //         console.log(response);
        //         // location.href = "/memes";

        //     }).catch(function (error) {
        //         console.log('33');
        //         console.log(error);
        //     });

        // })




    })










})



