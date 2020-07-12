

let controller = {
    index: function(req, res, next) {
        res.render('index', {title: "Algo"});
      },
    error: function(req, res, next) {
        res.render('error');
      }
};

module.exports = controller;