const { Sequelize } = require("sequelize");
const db = require("./db");

const Relationship = db.define("relationship", {
  relationship: {
    type: Sequelize.STRING,
  },
});

module.exports = Relationship;
