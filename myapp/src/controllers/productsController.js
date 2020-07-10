


module.exports = {
  productsIndex: function(req, res, next) {
      res.render('products', { title: 'Este es el home de productos' });
    },
  detail: function(req, res, next) {
    res.render('detail', { title: 'Este es el detalle de productos' });
  },
  upload: function (req, res, next) {
    res.render('upload',{ title: 'Este es el detalle de productos' }); //SACAR EL TITLE DEL HEAD!!!!
  }
};