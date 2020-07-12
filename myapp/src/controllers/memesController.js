module.exports = {
  memesIndex: function(req, res, next) {
      res.render("memes", {title: "Memes"});
    }
};