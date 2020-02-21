const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: true // put false to stop logging SQL to terminal
});

const db = {
  sequelize,
  Sequelize,
  models: {}
};

db.models.Movie = require('./models/movie.js')(sequelize);

module.exports = db;
