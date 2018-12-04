const express = require('express');
const videogames = express();
const models = require('../models');
const bodyParser = require('body-parser');

videogames.use(bodyParser.urlencoded({ extended: false }));

// index
videogames.get('/', (req, res) => {
  models.Videogame.findAll().then(videogames => {
    res.locals.videogames = videogames;
    res.render('videogames/index.handlebars');
  });
});

// show by ID
videogames.get('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogame => {
    if (!videogame) {
      return res.status(400).send('No-no, nem lenni Game!');
    }
    res.locals.videogame = videogame;
    res.render('videogames/show.handlebars');
  });
});

// edit
videogames.get('/:id/edit', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogame => {
    res.locals.videogame = videogame;
    res.render('videogames/edit.handlebars'); // egy mappa név és egy fáljnév
  });
});

// create
videogames.post('/:id/create', (req, res) => {
  models.Videogame.findOne({ where: { id: req.body.id } }).then(result => {
    if (result) {
      return res.status(400).send('Mar letezik ilyen GAME, agyááá mög másikat!');
    } else {
      models.Videogame.create(req.body).then(record => {
        res.locals.record = record;
        res.render('videogames/create.handlebars');
      });
    }
  });
});

// delete
videogames.delete('/:id', (req, res) => {
  models.Videogame.destroy({ where: { id: req.params.id } }).then(result => {
    if (!result) {
      return res.status(400).send('Nem lehet torolni, mert nem letezik!');
    }
    res.json(result);
  });
});

// update
videogames.put('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(result => {
    models.Videogame.findOne({ where: { name: req.body.name } }).then(result => {
      if (result) {
        return res.status(400).send('Erre nem modosithatod, mert már van ilyen nevu GAME!');
      }
    });
    if (!result) {
      return res.status(400).send('Nincs ilyen GAME, igy nem tudsz rajta valtoztatni!');
    } else {
      models.Videogame.update(req.body, { where: { id: req.params.id } }).then(result => {
        res.json(result);
      });
    }
  });
});

module.exports = videogames;
