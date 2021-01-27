// import bcrypt from "bcrypt";
// import _ from "lodash";
// import formatErrors from "../../utils/formatErrors";
// import { tryLogin } from "../../auth";
// import requiresAuth from "../permissions";
// import db from "../../models/db";
// import { QueryTypes } from "sequelize";

const BookResolver = {
  Query: {
    books: () => books,
  },
};

module.exports = BookResolver;
