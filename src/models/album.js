const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("./db");

const Album = db.define("album", {
  albumName: {
    type: Sequelize.STRING,
  },
  albumCover: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.pinimg.com/originals/62/23/9f/62239ff6ece559f2a7f3b3c3eb127433.jpg",
  },
});

Album.associate = (models) => {
  Album.belongsTo(models.Group);
  Album.hasMany(models.Photo);
};

module.exports = Album;
