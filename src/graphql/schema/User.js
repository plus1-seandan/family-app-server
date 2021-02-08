const { gql } = require("apollo-server-express");

const UserType = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    photo: String!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  type LoginResponse {
    ok: Boolean!
    user: User
    token: String
    errors: [Error!]
  }
  type ProfileResponse {
    user: User!
    group: Group!
  }
  extend type Query {
    me: User!
    getProfile: ProfileResponse!
    # allUsers: [User!]!
    # hi: String!
    # getUser(userId: Int!): User
  }
  extend type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      dateOfBirth: String!
    ): RegisterResponse!

    login(email: String!, password: String!): LoginResponse!

    updateUser(
      username: String!
      firstName: String!
      lastName: String!
    ): Boolean!
  }
`;

module.exports = UserType;
