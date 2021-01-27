const { Sequelize } = require("sequelize");
// import ENV from "../settings/env_vars";

const db = new Sequelize("bugtracker", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  define: {
    underscored: true,
  },
});

module.exports = db;
