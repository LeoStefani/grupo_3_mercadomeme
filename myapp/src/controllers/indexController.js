

let controller = {
    index: function(req, res, next) {
        res.render('index', {title: "Bienvenidos!"});
      },
    error: function(req, res, next) {
        res.render('error', {title: "Error"});
      }
};

module.exports = controller;