

window.addEventListener("load", function () {

    var qs = function (element) { return document.querySelector(element) }
    var qsa = function (element) { return document.querySelectorAll(element) }

    let memeToComplete = qs("img.memeToComplete");
    let memeCategory = qsa("img.memeCategory");
    let upperText = qs("p.upperText");
    let lowerText = qs("p.lowerText");
    let upperTextInput = qs("input[name='upperText']");
    let lowerTextInput = qs("input[name='lowerText']");
    let buttonColorToggle = qsa("button.colorToggle")
    let buttonDown = qsa("button.down")
    let buttonUp = qsa("button.up")


    let upperTextInitialPosition = 15
    let lowerTextInitialPosition = 75


    for (let i = 0; i < memeCategory.length; i++) {
        memeCategory[i].addEventListener("click", function (event) {
            memeToComplete.src = event.srcElement.currentSrc
        })
    }

    buttonColorToggle[0].addEventListener("click", function (event) {
        console.log(event);
        upperText.classList.toggle("dark");

    })

    buttonColorToggle[1].addEventListener("click", function (event) {
        console.log(event);
        lowerText.classList.toggle("dark");

    })

    buttonDown[0].addEventListener("click", function (event) {
        upperTextInitialPosition += 2.5
        if (upperTextInitialPosition<100){upperText.style.top=upperTextInitialPosition+"%"}
        else {upperTextInitialPosition=100}

        upperText.style.top=upperTextInitialPosition+"%"
    })

    buttonUp[0].addEventListener("click", function (event) {
        upperTextInitialPosition -= 2.5
        if (upperTextInitialPosition>0){upperText.style.top=upperTextInitialPosition+"%"}
        else {upperTextInitialPosition=0}

        
    })

    buttonDown[1].addEventListener("click", function (event) {
        lowerTextInitialPosition += 2.5
        if (lowerTextInitialPosition<100){lowerText.style.top=lowerTextInitialPosition+"%"}
        else {lowerTextInitialPosition=100}
    })

    buttonUp[1].addEventListener("click", function (event) {
        lowerTextInitialPosition -= 2.5
        if (lowerTextInitialPosition>0){lowerText.style.top=lowerTextInitialPosition+"%"}
        else {lowerTextInitialPosition=0}
    })


    upperTextInput.addEventListener("change", function (event) {
        upperText.innerText = event.srcElement.value;
    })

    lowerTextInput.addEventListener("change", function (event) {
        lowerText.innerText = event.srcElement.value;
    })





})



