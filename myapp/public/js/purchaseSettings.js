window.addEventListener("load", function () {

    let qs = element => {return document.querySelector(element)};
    let qsa = element => {return document.querySelectorAll(element)};
    
    let finalPurchaseConfirm = qs("#finalPurchaseConfirm");

    console.log(finalPurchaseConfirm);

    finalPurchaseConfirm.addEventListener("click", event => {
        event.preventDefault();
        localStorage.setItem('cart', JSON.stringify([]));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Gracias por tu compra!!',
            showConfirmButton: false,
            timer: 1500
          }).then( results => {
                window.location.href = "/";
          });
    });
    
});