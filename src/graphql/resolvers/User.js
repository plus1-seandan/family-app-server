// import bcrypt from "bcrypt";
// import _ from "lodash";
// import formatErrors from "../../utils/formatErrors";
// import { tryLogin } from "../../auth";
// import requiresAuth from "../permissions";
// import db from "../../models/db";
// import { QueryTypes } from "sequelize";

const formatErrors = require("../../utils/formatErrors");

const UserResolver = {
  Query: {
    // allUsers: (parent, args, { models }) => models.User.findAll(),
    // me: requiresAuth.createResolver(async (parent, args, { models, user }) => {
    //   console.log(user);
    //   const me = await models.User.findOne(
    //     { where: { id: user.id } },
    //     { raw: true }
    //   );
    //   return me;
    // }),
  },
  Mutation: {
    // login: (parent, { email, password }, { models, req, res }) =>
    //   tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, args, { models }) => {
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
