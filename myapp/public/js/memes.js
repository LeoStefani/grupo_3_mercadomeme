

window.addEventListener("load", function () {

    var qs = function (element) {return document.querySelector(element)}
    var qsa = function (element) {return document.querySelectorAll(element)}

    
    let memeToComplete = qs("img.memeToComplete");
    let memeCategory = qsa("img.memeCategory");

    for (let i=0; i<memeCategory.length; i++) {

    memeCategory[i].addEventListener("click", function (event) {
        console.log(event)
    
        memeToComplete.src = event.srcElement.currentSrc

   })
    
     
}
    
    
    })
    
    
    
