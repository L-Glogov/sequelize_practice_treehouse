const db = require('./db');
const {Movie, Person} = db.models;
const { Op } = db.Sequelize;

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
        isAvailableOnVHS: false
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

// CREATE a record using build()
    const movie3 = await Movie.build({
      title: "Toy Story 3",
      runtime: 103,
      releaseDate: "2010-06-18",
      isAvailableOnVHS: false
    });
    await movie3.save(); //save the record
    // console.log(movie3.toJSON());

    // search db by ID
    const movieById = await Movie.findByPk(2);
    console.log(movieById.toJSON());

    // search db for a single matching record
    const movieByRuntime = await Movie.findOne({
      where: {
        runtime: 148
      }
    });
    console.log(movieByRuntime.toJSON());

    const movies = await Movie.findAll({
      attributes: ["movie_id", "title"], // return only id and title
      where: {
        releaseDate: {
          [Op.gte]: '2001-11-02' //greater than or equal to the date
        }
      },
      order: [['releaseDate', 'DESC']]
    });
    console.log(movies.map(movie => movie.toJSON()));

    //UPDATING RECORDS:
    const toyStory3 = await Movie.findByPk(5);
    await toyStory3.update({
      isAvailableOnVHS: true,
    });
    console.log( toyStory3.get({ plain: true }) );

    //OR:

    const trinket = await Movie.findByPk(3);
    await trinket.update({
      title: 'Trinket Tale 3', // new title
      isAvailableOnVHS: true,
    }, { fields: ['isAvailableOnVHS'] }); //ignores title in updating , as it is not specified in fields

    console.log( trinket.get({ plain: true }) );

    // DELETING a RECORDS

    const toDel = await Movie.findByPk(2);

    await toDel.destroy();

  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      const errors = e.errors.map(e => e.message);
      console.error('Validation errors: ', errors);
    } else {
      throw e;
    }
  }
})();
