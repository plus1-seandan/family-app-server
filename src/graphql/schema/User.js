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
    user: User
    token: String
    errors: [Error!]
  }

<<<<<<< HEAD
  extend type Query {
    me: User!
    # allUsers: [User!]!
    # hi: String!
    # getUser(userId: Int!): User
  }
=======
  # extend type Query {
  #   # me: User!
  #   # allUsers: [User!]!
  #   # hi: String!
  #   # getUser(userId: Int!): User
  # }
>>>>>>> 5f56498b5aa4e5870a2c0beba6205477036deea8
  extend type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      dateOfBirth: String!
    ): RegisterResponse!
<<<<<<< HEAD
    login(email: String!, password: String!): LoginResponse
=======
    # login(email: String!, password: String!): LoginResponse
>>>>>>> 5f56498b5aa4e5870a2c0beba6205477036deea8
  }
`;

module.exports = UserType;
