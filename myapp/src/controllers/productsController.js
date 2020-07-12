


module.exports = {
  productsIndex: function(req, res, next) {
      res.render('products', { title: 'Productos' });
    },
  detail: function(req, res, next) {
    res.render('detail', { title: 'Detalle de productos' });
  },
  upload: function (req, res, next) {
    res.render('upload',{ title: 'Carga de productos'  }); //SACAR EL TITLE DEL HEAD!!!!
  }
};