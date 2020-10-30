window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let showPassword = qs("a.showPassword");
    let inputPassword = qs("input[name='loginPassword']");
    let iconEye = qs("i.iconEye");

    showPassword.addEventListener('click', (event) => {
        event.preventDefault();
        // Escribo en type el valor contrario al que tiene el atributo.
        const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        //Se lo pego al input
        inputPassword.setAttribute('type', type);
        //Cambio la clase del icono para que tache el ojo
        iconEye.classList.toggle('fa-eye-slash');
        iconEye.classList.toggle('fa-eye');
    });

});