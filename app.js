const db = require('./db');
const {Movie} = db.models;

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
      title: "Forest Gump"
    });
      console.log(movie.toJSON());
    // new entry in the db (this will not log to the console)
    await Movie.create({
      title: "Shawshank Redemption"
    });
    // Multiple new entries using Promise.Calling
    const movieInstances = await Promise.all([
      Movie.create({
        title: "Monsters Inc."
      }),
      Movie.create({
        title: "Inception"
      })
    ]);

    //to log the movieOnstances json to the console:
    const moviesJSON = movieInstances.map(movie => movie.toJSON());
    console.log(moviesJSON);

  } catch (e) {
    console.error("Error connecting to the database:", e);
  }
})();
