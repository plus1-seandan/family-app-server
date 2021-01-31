const Sequelize = require("sequelize");

const User = require("./user");
const Member = require("./Member");
const Group = require("./group");
const Relationship = require("./relationship");
const Event = require("./Event");
const Album = require("./Album");
const Photo = require("./Photo");
const Message = require("./Message");

const db = require("./db");

const models = {
  User,
  Member,
  Group,
  Relationship,
  Event,
  Album,
  Photo,
  Message,
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
