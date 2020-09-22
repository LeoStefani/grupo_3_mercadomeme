const memeResources = require('../requests/memeResources')
const fs = require("fs")
const path = require("path");

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
  },
  memeRename: function(req, res, next) {

    if (req.session.memeCreated) {
      // console.log(req.body)
    fs.copyFile(path.join(__dirname, '../../public/images/memes/memeUser.png'), path.join(__dirname, '../../public/images/memes/memeUser'+req.body.tag+'.png'), (err) => {
      if (err) throw err;
      console.log('success');
    });}
    res.send("OK");

  }
};