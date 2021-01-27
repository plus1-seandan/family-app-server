const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

const db = require("./models/db");
const models = require("./models");
const UserResolvere = require("./graphql/resolvers/User");
const schema = require("./graphql");
const { buildSchema } = require("graphql");
const BookResolver = require("./graphql/resolvers/Book");

const main = async () => {
  //set db connection
  //sync database
  await db.sync({
    models,
    // force: true
  }); //force syncs database for development

  const app = express();
  app.use(cors());

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      // req,
      // res,
      // redis,
      // userLoader: createUserLoader(),
      // updootLoader: createUpdootLoader(),
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  }); //this will create graphql endpoint for us in express

  app.listen(parseInt(process.env.PORT), () => {
    console.log(`server started on localhost:${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
