const { gql } = require("apollo-server-express");

const UserType = gql`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  #   type Query {
  #     me: User!
  #     allUsers: [User!]!
  #     hi: String!
  #     getUser(userId: Int!): User
  #   }
  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
    ): RegisterResponse!
    login(email: String!, password: String!): LoginResponse
  }
`;

module.exports = UserType;