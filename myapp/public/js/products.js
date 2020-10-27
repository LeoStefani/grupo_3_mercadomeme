
window.addEventListener("load", function () {

    let qs = function (element) { return document.querySelector(element) }
    let qsa = function (element) { return document.querySelectorAll(element) }

    let imageExample = qsa("div img.example");
    let imageMain = qs("img.main-product");

    //Agrega un evento por cada imagen alternativa que venga de la base de datos. Al clickearla, pega esa src en la main.
    for (let i = 0; i < imageExample.length; i++) {
        imageExample[i].addEventListener("click", function (event) {
            imageMain.src = event.srcElement.currentSrc
        });
    };
});