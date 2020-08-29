

window.addEventListener("load", function () {

let qs = function (element) {return document.querySelector(element)}
function qsa (element) {return document.querySelectorAll(element)}


let imageExample = qsa("div img.example");
let imageMain = qs("img.main-product");

for (let i=0; i<imageExample.length; i++) {

    imageExample[i].addEventListener("click", function (event) {
    
    imageMain.src = event.srcElement.currentSrc
    console.log(event);
    
    })

}




})