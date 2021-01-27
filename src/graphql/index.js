const { gql, makeExecutableSchema } = require("apollo-server-express");

const BookType = require("./schema/Book");
const BookResolver = require("./resolvers/Book");
const UserType = require("./schema/User");
const UserResolver = require("./resolvers/User");
const ErrorType = require("./schema/Error");
const GroupType = require("./schema/Group");
const GroupResolver = require("./resolvers/Group");
const MemberType = require("./schema/Member");
const MemberResolver = require("./resolvers/Member");

const schema = makeExecutableSchema({
  typeDefs: [BookType, UserType, ErrorType, GroupType, MemberType],
  resolvers: [BookResolver, UserResolver, GroupResolver, MemberResolver],
});

module.exports = schema;
