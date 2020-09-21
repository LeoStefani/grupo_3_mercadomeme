const memeResources = require('../requests/memeResources')
const fs = require("fs")

module.exports = {
  memesIndex: function (req, res, next) {

    memeResources.trending().then(function (values) {


      res.render("memes", {
        title: "Memes",
        memes: values.data.data.memes,
        session: req.session.memeCreated
      });

    }).catch(function (errors) {
      res.send(errors)
    })

  },
  memeSave: function(req,res,next) {
    req.session.memeCreated = true;
    res.send("OK");
  }
};