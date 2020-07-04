

let controller = {
    memesIndex: function(req, res, next) {
        res.render('memes', { title: 'Este es el home de los memes' });
      }
};

module.exports = controller;