const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("./db");

const Photo = db.define("photo", {
  title: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
  },
});

Photo.associate = (models) => {
  Photo.belongsTo(models.Album);
};

module.exports = Photo;
