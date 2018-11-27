const express = require('express');
const videogames = express();
const models = require('../models');
const bodyParser = require('body-parser');

videogames.use(bodyParser.urlencoded({ extended: false }));

// index
videogames.get('/', (req, res) => {
  models.Videogame.findAll().then(videogames => {
    res.json(videogames);
  });
});

// show by ID
videogames.get('/:id', (req, res) => {
  models.Videogame.findById(req.params.id).then(videogame => {
    if (!videogame) {
      return res.status(400).send('No-no, nem lenni Game!');
    }
    res.json(videogame);
  });
});

// create
videogames.post('/', (req, res) => {
  models.Videogame.findOne({ where: { id: req.body.id } }).then(result => {
    if (result) {
      return res.status(400).send('Mar letezik ilyen GAME, agyááá mög másikat!');
    } else {
      models.Videogame.create(req.body).then(record => {
        res.json(record);
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
