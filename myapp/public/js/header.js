window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let shopCartIcon = qs("#shopCartIcon");
    
    shopCartIcon.addEventListener('click', event => {
        event.preventDefault();
        
        fetch(shopCartIcon.href, {
            method: 'POST',
            body: JSON.stringify(localStorage),
            headers: {
                'Content-Type' : 'application/json'
                },
            }).then(function(response) {
                return response.json();
            }).then(function(info){
                console.log(info);
            }).catch(function (error) {
                console.log(error);
            });
        
        // location.href = shopCartIcon.href;

    });
    
});