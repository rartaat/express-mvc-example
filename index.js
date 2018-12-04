const express = require('express');
const app = express();
const clocks = require('./controllers/clocks');
const videogames = require('./controllers/videogames');
const pokemons = require('./controllers/pokemons');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/clocks', clocks);
app.use('/videogames', videogames);
app.use('/pokemons', pokemons);

app.listen(process.env.PORT);
