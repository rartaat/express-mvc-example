const express = require('express');
const clocks = express();
const models = require('../models');
const bodyParser = require('body-parser');

clocks.use(bodyParser.urlencoded({ extended: false }));

// index
clocks.get('/', (req, res) => {
  models.Clock.findAll().then(clocks => {
    res.json(clocks);
  });
});

// show by ID
clocks.get('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(clock => {
    if (!clock) {
      return res.status(400).send('Nem talalhato ilyen ID!');
    }
    res.json(clock);
  });
});

// create
clocks.post('/', (req, res) => {
  models.Clock.findOne({ where: { id: req.body.id } }).then(result => {
    if (result) {
      return res.status(400).send('Mar letezik ilyen bizsuóra, agyááá mög másikat!');
    } else {
      models.Clock.create(req.body).then(record => {
        res.json(record);
      });
    }
  });
});

// delete
clocks.delete('/:id', (req, res) => {
  models.Clock.destroy({ where: { id: req.params.id } }).then(result => {
    if (!result) {
      return res.status(400).send('Ellopta egy migrántóóó, igy nem létezik');
    }
    res.json(result);
  });
});

// update
clocks.put('/:id', (req, res) => {
  models.Clock.findById(req.params.id).then(result => {
    models.Clock.findOne({ where: { model: req.body.model } }).then(result => {
      if (result) {
        return res.status(400).send('Erre nem modosithatod, nincs ilyen modell!');
      }
    });
    if (!result) {
      return res.status(400).send('Nincs ilyen WACS, igy nem tudsz rajta valtoztatni!');
    } else {
      models.Clock.update(req.body, { where: { id: req.params.id } }).then(result => {
        res.json(result);
      });
    }
  });
});

module.exports = clocks;
