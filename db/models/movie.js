const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    // Set custom primary key column
    movie_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"'
        },
        notEmpty: {
          //custom error message
          msg: 'Please provide a value for a title'
        }
      }
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "runtime"'
        },
        min: {
          args: 1,
          msg: 'Please provide a value greater than "0" for "runtime"'
        }
      }
    },
    releaseDate: {
      type: Sequelize.DATEONLY, //the DATE data type accepts a date value provided in yyyy-mm-dd hh:mm:ss format, while DATEONLY accepts a date value in yyyy-mm-dd format (DATE without time).
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "releaseDate"'
        },
        isAfter: {
          args: "1895-12-27",
          msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"'
        }
      }
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  //Model options object
  {
    // It is possible to set global options, like this:
    // define: {
      //   freezeTableName: true,
      //   timestamps: false,}

    // modelName: 'movie', //  set model name to 'movie'
    timestamps: true, // disable timestamps
    paranoid: true, // enables "soft" deletes; only works if timestamps is NOT false
    // freezeTableName: true, // disable automatic pluralization of table names
    sequelize // shorthand for sequelize: sequelize
  });



  return Movie;
}
