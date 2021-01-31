const { gql } = require("apollo-server-express");

const PhotoType = gql`
  type Photo {
    id: Int!
    title: String!
    url: String!
  }
  type PostPhotoResponse {
    ok: Boolean!
    photo: Photo
    errors: [Error!]
  }
  
  extend type Mutation {
    postPhoto(albumId: Int!, url: String!): PostPhotoResponse!
  }
`;

module.exports = PhotoType;
