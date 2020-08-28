

window.addEventListener("load", function () {

    var qs = function (element) {return document.querySelector(element)}
    var qsa = function (element) {return document.querySelectorAll(element)}

    
    // let category = qsa("a.memeCategory");
    // let image = qs("img.memeCategory");


    document.querySelectorAll("a.memeCategory").addEventListener("click", function (event) {

        event.preventDefault();

        console.log(event)

    })
    
     
    
    
    
    })
    
    
    
