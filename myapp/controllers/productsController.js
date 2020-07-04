

let controller = {
    productsIndex: function(req, res, next) {
        res.render('products', { title: 'Este es el home de productos' });
      }
};

module.exports = controller;