const { gql } = require("apollo-server-express");

const ErrorType = gql`
  type Error {
    path: String!
    message: String!
  }
`;

module.exports = ErrorType;
