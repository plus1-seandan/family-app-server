const { gql } = require("apollo-server");

const MessageType = gql`
  type Message {
    id: Int!
    text: String!
    createdAt: String!
    user: User!
    me: Boolean
  }

  type Subscription {
    newMessage(groupId: Int!): Message!
  }

  extend type Query {
    messages(groupId: Int!, userId: Int!): [Message!]!
  }

  extend type Mutation {
    createMessage(userId: Int!, text: String!): Message!
  }
`;

module.exports = MessageType;
