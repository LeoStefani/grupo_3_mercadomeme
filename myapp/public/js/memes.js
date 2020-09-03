

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
    let buttonCenter = qsa("button.center");
    let buttonRight = qsa("button.right");
    let buttonMoreSpacing = qsa("button.moreSpacing");
    let buttonLessSpacing = qsa("button.lessSpacing");
    let buttonReset = qsa("button.reset");


    let upperTextInitialPosition = 15
    let upperTextInitialSpacing = 2

    let lowerTextInitialPosition = 75
    let lowerTextInitialSpacing = 2



    // ======================================MEME TO COMPLETE SELECTION========================================================


    for (let i = 0; i < memeCategory.length; i++) {
        memeCategory[i].addEventListener("click", function (event) {
            memeToComplete.src = event.srcElement.currentSrc
        })
    }

    // ======================================UPPER TEXT========================================================

    buttonColorToggle[0].addEventListener("click", function (event) {
        console.log(event);
        upperText.classList.toggle("dark");

    })

    buttonDown[0].addEventListener("click", function (event) {
        upperTextInitialPosition += 2.5
        if (upperTextInitialPosition<95){upperText.style.top=upperTextInitialPosition+"%"}
        else {upperTextInitialPosition=95}

        upperText.style.top=upperTextInitialPosition+"%"
    })

    buttonUp[0].addEventListener("click", function (event) {
        upperTextInitialPosition -= 2.5
        if (upperTextInitialPosition>2.5){upperText.style.top=upperTextInitialPosition+"%"}
        else {upperTextInitialPosition=2.5}

        
    })

    buttonLeft[0].addEventListener("click", function (event) {
        
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

    buttonRight[0].addEventListener("click", function (event) {
        
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
        if (upperTextInitialSpacing<20){upperText.style.wordSpacing=upperTextInitialSpacing+"px"}
        else {upperTextInitialSpacing=20}
    })

    buttonLessSpacing[0].addEventListener("click", function (event) {
        upperTextInitialSpacing -= 1;
        if (upperTextInitialSpacing>-5){upperText.style.wordSpacing=upperTextInitialSpacing+"px"}
        else {upperTextInitialSpacing=-5}
    })

    buttonReset[0].addEventListener("click", function (event) {
        upperTextInitialPosition = 15;
        upperTextInitialSpacing = 2;
        upperText.style.wordSpacing="2px";
        upperText.style.top="15%"
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

    buttonDown[1].addEventListener("click", function (event) {
        lowerTextInitialPosition += 2.5
        if (lowerTextInitialPosition<97.5){lowerText.style.top=lowerTextInitialPosition+"%"}
        else {lowerTextInitialPosition=97.5}
    })

    buttonUp[1].addEventListener("click", function (event) {
        lowerTextInitialPosition -= 2.5
        if (lowerTextInitialPosition>2.5){lowerText.style.top=lowerTextInitialPosition+"%"}
        else {lowerTextInitialPosition=2.5}
    })

    buttonLeft[1].addEventListener("click", function (event) {
        
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

    buttonRight[1].addEventListener("click", function (event) {
        
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
        if (lowerTextInitialSpacing<20){lowerText.style.wordSpacing=lowerTextInitialSpacing+"px"}
        else {lowerTextInitialSpacing=20}
    })

    buttonLessSpacing[1].addEventListener("click", function (event) {
        lowerTextInitialSpacing -= 1;
        if (lowerTextInitialSpacing>-5){lowerText.style.wordSpacing=lowerTextInitialSpacing+"px"}
        else {lowerTextInitialSpacing=-5}
    })

    buttonReset[1].addEventListener("click", function (event) {
        lowerTextInitialPosition = 75
        lowerTextInitialSpacing = 2
        lowerText.style.wordSpacing="2px";
        lowerText.style.top="75%"
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



})



