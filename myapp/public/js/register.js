

window.addEventListener("load", function () {

let qs = function (element) {return document.querySelector(element)}

let button = qs("button.submit");
let form = qs("form");


button.addEventListener("click", function (event) {

    event.preventDefault();

    let password = qs("input[name='userPassword']");

    let rePassword = qs("input[name='userRePassword']");

    console.log(password.value)

    console.log(rePassword.value)

    
  
    if (rePassword.value == password.value && password.value!="" ) {

        qs("small.rePassword").innerText = ""

        form.submit()

    } else {

        qs("small.password").innerText = "Las contraseñas no coinciden o se encuentran vacías" 
        qs("small.rePassword").innerText = "Las contraseñas no coinciden o se encuentran vacías" ;

        
    }



})




})