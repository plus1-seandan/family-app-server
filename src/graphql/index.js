const { gql, makeExecutableSchema } = require("apollo-server-express");

const BookType = require("./schema/Book");
const BookResolver = require("./resolvers/Book");
const UserType = require("./schema/User");
const UserResolver = require("./resolvers/User");
const ErrorType = require("./schema/Error");

const schema = makeExecutableSchema({
  typeDefs: [BookType, UserType, ErrorType],
  resolvers: [BookResolver, UserResolver],
});

module.exports = schema;
