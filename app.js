const db = require('./db');
const {Movie, Person} = db.models;

// In development (or testing), you may want to refresh your database tables each time you start your app. Calling sync({ force: true }) issues a DROP TABLE IF EXISTS statement, which completely deletes the table, before issuing the CREATE TABLE IF NOT EXISTS statement. In other words, it will drop a table that exists, each time you start your app, and recreate it from the model definition.
(async () => {
  // Sync "Movies" table
  await db.sequelize.sync({
    force: true
  });
  try {
    // await sequelize.authenticate(); --authenticating the Connection
    // Instance of the Movie class represents a database row
    const movie = await Movie.create({
      title: "Forrest Gump",
      runtime: 142,
      releaseDate: "1994-06-23",
      isAvailableOnVHS: true
    });
      // console.log(movie.toJSON());
    // new entry in the db (this will not log to the console)
    await Movie.create({
      title: "Shawshank Redemption",
      runtime: 142,
      releaseDate: "1994-09-23",
      isAvailableOnVHS: true
    });
    // Multiple new entries using Promise.Calling
    const movieInstances = await Promise.all([
      Movie.create({
        title: "Monsters Inc.",
        runtime: 92,
        releaseDate: "2001-11-02",
        isAvailableOnVHS: true
      }),
      Movie.create({
        title: "Inception",
        runtime: 148,
        releaseDate: "2010-07-16"
      })
    ]);

    //to log the movieInstances json to the console:
    // const moviesJSON = movieInstances.map(movie => movie.toJSON());
    // console.log(moviesJSON);

    await Person.create({
        firstName: "Christopher",
        lastName: "Nolan"
    });

    

  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      const errors = e.errors.map(e => e.message);
      console.error('Validation errors: ', errors);
    } else {
      throw e;
    }
  }
})();
