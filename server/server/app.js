// declarations
require('dotenv').config()
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/usersRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');
const gamesRoutes = require('./routes/gamesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// db connection
const db = require('./configs/db.config');

// routes
app.use('/api/users', usersRoutes(db));
app.use('/api/appointments', appointmentsRoutes(db));
app.use('/api/games', gamesRoutes(db));
app.use('/api/categories', categoriesRoutes(db));

app.get('/', (req, res) => {
	res.json({ greetings: 'hello world' });
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

