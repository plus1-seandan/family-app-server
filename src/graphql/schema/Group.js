const { gql } = require("apollo-server-express");

const GroupType = gql`
  type Group {
    id: Int!
    groupName: String!
    members: [User!]
  }

  type CreateGroupResponse {
    ok: Boolean!
    group: Group
    errors: [Error!]
  }
  #   type LoginResponse {
  #     ok: Boolean!
  #     token: String
  #     refreshToken: String
  #     errors: [Error!]
  #   }

  #   type Query {
  #     me: User!
  #     allUsers: [User!]!
  #     hi: String!
  #     getUser(userId: Int!): User
  #   }
  type Mutation {
    createGroup(groupName: String!): CreateGroupResponse!
    # login(email: String!, password: String!): LoginResponse
  }
`;

module.exports = GroupType;
