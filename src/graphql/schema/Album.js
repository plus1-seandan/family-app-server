const { gql } = require("apollo-server-express");

const AlbumType = gql`
  type Album {
    id: Int!
    albumName: String!
    createdAt: String!
    albumCover: String!
    photos: [Photo!]
  }

  type CreateAlbumResponse {
    ok: Boolean!
    album: Album
    errors: [Error!]
  }

  extend type Query {
    getAlbums: [Album!]
    getAlbum(albumId: Int!): Album!
  }
  extend type Mutation {
    createAlbum(albumName: String!): CreateAlbumResponse!
    deleteAlbum(albumId: Int!): Boolean!
  }
`;

module.exports = AlbumType;
