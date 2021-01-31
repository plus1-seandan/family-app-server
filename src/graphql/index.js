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
const EventType = require("./schema/Event");
const EventResolver = require("./resolvers/Event");
const AlbumType = require("./schema/Album");
const AlbumResolver = require("./resolvers/Album");
const PhotoType = require("./schema/Photo");
const FileResolver = require("./resolvers/File");
const FileType = require("./schema/File");
const PhotoResolver = require("./resolvers/Photo");
const MessageType = require("./schema/Message");
const MessageResolver = require("./resolvers/Message");

const schema = makeExecutableSchema({
  typeDefs: [
    BookType,
    UserType,
    ErrorType,
    GroupType,
    MemberType,
    EventType,
    AlbumType,
    PhotoType,
    FileType,
    MessageType,
  ],
  resolvers: [
    BookResolver,
    UserResolver,
    GroupResolver,
    MemberResolver,
    EventResolver,
    AlbumResolver,
    FileResolver,
    PhotoResolver,
    MessageResolver,
  ],
});

module.exports = schema;
