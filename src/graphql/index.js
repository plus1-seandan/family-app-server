const { gql, makeExecutableSchema } = require("apollo-server-express");

const BookType = require("./schema/Book");
const BookResolver = require("./resolvers/Book");

const schema = makeExecutableSchema({
  typeDefs: [BookType],
  resolvers: [BookResolver],
});

module.exports = schema;
