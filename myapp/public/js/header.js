window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let shopCartIcon = qs("#shopCartIcon");
    
    shopCartIcon.addEventListener('click', event => {
        event.preventDefault();
        console.log('00');
        fetch(shopCartIcon.href, {
            method: 'POST',
            body: JSON.stringify(localStorage),
            headers: {
                'Content-Type' : 'application/json'
                },
            }).then(function(response) {
                console.log('11');
                console.log(response);
                location.href = shopCartIcon.href;
            // }).then(function(info){
            //     console.log('22');
            //     console.log(info);
            }).catch(function (error) {
                console.log('33');
                console.log(error);
            });
        

    });
    
});