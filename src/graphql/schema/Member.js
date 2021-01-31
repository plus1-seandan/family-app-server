const { gql } = require("apollo-server-express");

const MemberType = gql`
  type Member {
    userId: Int!
    groupId: Int!
    user: User!
  }

  type AddMemberResponse {
    ok: Boolean!
    member: Member
    errors: [Error!]
  }

  #   type Query {
  #     # me: User!
  #     # allUsers: [User!]!
  #     # hi: String!
  #     # getUser(userId: Int!): User
  #   }
  extend type Mutation {
    addMember(userId: Int!, groupId: Int!): AddMemberResponse!
  }
`;

module.exports = MemberType;
