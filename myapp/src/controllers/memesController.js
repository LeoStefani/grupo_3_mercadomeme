const memeResources = require('../requests/memeResources')
const fs = require("fs")
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  memesIndex: function (req, res, next) {

    // aca se fija si hay alguien loggeado para ver si manda los memes a la biblioteca o no

    let user = "random"

    if (req.session.loggedUser) {

      db.User.findByPk(req.session.loggedUser.id, {
        include: [{
          all: true
        }]
      }).then(function (users) {

        user = users
      })
        .catch(function (error) { res.send(error) });

    }

    memeResources.trending().then(function (values) {

      // Aca se tiene que fijar si hay alguien loggeado. Si hay, manda a la vista la info en user, y sino en user va una info por defecto. Para renderizar o no la biblioteca de memes.

      res.render("memes", {
        title: "Memes",
        memes: values.data.data.memes,
        user: user
      });

    }).catch(function (errors) {
      res.send(errors)
    })

  },
  memeSave: function (req, res, next) {
    req.session.memeCreated = true;
    res.send("OK");
  },
  memeRename: function (req, res, next) {

    if (req.session.memeCreated) {
      // console.log(req.body)
      fs.copyFile(path.join(__dirname, '../../public/images/memes/memeUser.png'), path.join(__dirname, '../../public/images/memes/memeUser' + req.body.tag + '.png'), (err) => {
        if (err) throw err;
        console.log('success');
      });
    }
    res.send("OK");

  },
  memeToLibrary: function (req, res, next) {

    let newName = '/images/memes/UserLibrary' + Date.now() + '.png';

    fs.copyFile(path.join(__dirname, '../../public/images/memes/memeUser.png'), path.join(__dirname, '../../public' + newName), (err) => {
      if (err) throw err;
      console.log('success');
    });

    db.User_Meme.create({
      id_user: req.session.loggedUser.id,
      number: req.body.new_credit_card_number,
      meme_location: newName
    }).then(function (second) {
      res.redirect("/memes")
    })
      .catch(function (errors) {
        res.send(errors)
      })

    res.send("OK");



  }
};