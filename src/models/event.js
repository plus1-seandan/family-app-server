const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("./db");

const Event = db.define("event", {
  eventName: {
    type: Sequelize.STRING,
  },
  startDate: {
    type: Sequelize.DATE,
  },
});

Event.associate = (models) => {
  Event.belongsTo(models.Group);
};

module.exports = Event;
