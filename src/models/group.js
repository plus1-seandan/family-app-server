const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("./db");

const Group = db.define("group", {
  groupName: {
    type: Sequelize.STRING,
  },
});

Group.associate = (models) => {
  Group.belongsToMany(models.User, {
    through: models.Member,
    foreignKey: "groupId",
  });
  Group.hasMany(models.Event);
  Group.hasMany(models.Album);
};

module.exports = Group;
