const memeResources = require('../requests/memeResources')

module.exports = {
  memesIndex: function (req, res, next) {

    memeResources.trending().then(function (values) {



      // res.send(values.data.data.memes)

      res.render("memes", {
        title: "Memes",
        memes: values.data.data.memes
      });

    }).catch(function (errors) {
      res.send(errors)
    })

  }
};