

let controller = {
    index: function(req, res, next) {
        res.render('index', { title: 'MercadoMEME' });
      }
};

module.exports = controller;