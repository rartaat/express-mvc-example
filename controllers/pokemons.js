const express = require('express');
const pokemons = express();
const models = require('../models');
const bodyParser = require('body-parser');

pokemons.use(bodyParser.urlencoded({ extended: false }));

// index
pokemons.get('/', (req, res) => {
  models.Pokemon.findAll().then(pokemons => {
    res.json(pokemons);
  });
});

// show by ID
pokemons.get('/:id', (req, res) => {
  models.Pokemon.findById(req.params.id).then(pokemon => {
    if (!pokemon) {
      return res.status(400).send('Nincs ilyen pokemon!');
    }
    res.json(pokemon);
  });
});

// create
pokemons.post('/', (req, res) => {
  models.Pokemon.findOne({ where: { id: req.body.id } }).then(result => {
    if (result) {
      return res.status(400).send('Mar letezik ilyen pokemonka, agyááá mög másikat!');
    } else {
      models.Pokemon.create(req.body).then(record => {
        res.json(record);
      });
    }
  });
});

// delete
pokemons.delete('/:id', (req, res) => {
  models.Pokemon.destroy({ where: { id: req.params.id } }).then(result => {
    if (!result) {
      return res.status(400).send('Nem lehet torolni, mert nem letezik!');
    }
    res.json(result);
  });
});

// update
pokemons.put('/:id', (req, res) => {
  models.Pokemon.findById(req.params.id).then(result => {
    models.Pokemon.findOne({ where: { name: req.body.name } }).then(result => {
      if (result) {
        return res.status(400).send('Erre nem modosithatod, mert már van ilyen nevu pokemon!');
      }
    });
    if (!result) {
      return res.status(400).send('Nincs ilyen pokemon, igy nem tudsz rajta valtoztatni!');
    } else {
      models.Pokemon.update(req.body, { where: { id: req.params.id } }).then(result => {
        res.json(result);
      });
    }
  });
});

module.exports = pokemons;