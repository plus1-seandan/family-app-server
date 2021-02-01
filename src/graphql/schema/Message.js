const { gql } = require("apollo-server");

const MessageType = gql`
  type Message {
    id: Int!
    text: String!
    user: User!
    me: Boolean
  }

  type Subscription {
    newMessage: Message!
  }

  extend type Query {
    messages: [Message!]!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
  }
`;

module.exports = MessageType;
