

window.addEventListener("load", function () {

let qs = function (element) {return document.querySelector(element)}
function qsa (element) {return document.querySelectorAll(element)}


let imageExample = qsa("div img.example");
let imageMain = document.querySelector("img.main-product")

for (let i=0; i<imageExample.length; i++) {

    imageExample[i].addEventListener("click", function (event) {
    
    imageMain.src = event.srcElement.currentSrc
    
    })

}




})