const { gql } = require("apollo-server-express");

const FileType = gql`
  scalar Upload

  type File {
    url: String!
    # filename: String!
    # mimetype: String!
    # encoding: String!
  }

  extend type Query {
    files: [File]
  }

  extend type Mutation {
    uploadFile(file: Upload!): File!
  }
`;

module.exports = FileType;
