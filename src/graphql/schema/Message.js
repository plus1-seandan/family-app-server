const { gql } = require("apollo-server");

const MessageType = gql`
  type Message {
    id: Int!
    text: String!
    user: User!
  }

  #   type Subscription {
  #     newChannelMessage(channelId: Int!): Message!
  #   }

  extend type Query {
    messages(groupId: Int!): [Message!]!
  }

  extend type Mutation {
    createMessage(groupId: Int!, text: String!): Boolean!
  }
`;

module.exports = MessageType;
