const Sequelize = require("sequelize");

const User = require("./user");
const Member = require("./Member");
const Project = require("./Project");

const db = require("./db");

const models = {
  User,
  Member,
  Project,
};

//if a model has associate attribute, create the associations
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.Sequelize = Sequelize;

module.exports = models;
