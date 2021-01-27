// import bcrypt from "bcrypt";
// import _ from "lodash";
// import formatErrors from "../../utils/formatErrors";
// import { tryLogin } from "../../auth";
// import requiresAuth from "../permissions";
// import db from "../../models/db";
// import { QueryTypes } from "sequelize";
const passport = require("passport");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const formatErrors = require("../../utils/formatErrors");
require("dotenv").config();

const UserResolver = {
  Query: {
    // allUsers: (parent, args, { models }) => models.User.findAll(),
    me: async (parent, args, { req }) => {
      if (!req.userId) {
        return null;
      }

      const me = await models.User.findOne(
        { where: { id: req.userId } },
        { raw: true }
      );
      return me;
    },
  },
  Mutation: {
    login: async (parent, { email, password }, { models, req, res }) => {
      try {
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
          return {
            ok: false,
          };
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return {
            ok: false,
          };
        }
        const token = sign({ userId: user.id }, process.env.SECRET_KEY);
        return { ok: true, token, user };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
    register: async (parent, args, { models }) => {
      console.log("hit");
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};

module.exports = UserResolver;
