const { gql } = require("apollo-server-express");

const EventType = gql`
  type Event {
    id: Int!
    eventName: String!
    startDate: String!
  }

  type CreateEventResponse {
    ok: Boolean!
    event: Event
    errors: [Error!]
  }

  extend type Query {
    getUpcomingEvents: [Event!]
  }
  extend type Mutation {
    createEvent(eventName: String!, startDate: String!): CreateEventResponse!
  }
`;

module.exports = EventType;
