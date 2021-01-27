const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const passport = require("passport");
const bodyParser = require("body-parser");

require("dotenv").config();

const db = require("./models/db");
const models = require("./models");
const schema = require("./graphql");

const { buildSchema } = require("graphql");
const BookResolver = require("./graphql/resolvers/Book");
const setupPassport = require("./config/passport");

const main = async () => {
  //set db connection
  //sync database
  await db.sync({
    models,
    force: true,
  }); //force syncs database for development

  const app = express();
  app.use(cors());
  app.use(passport.initialize());
  setupPassport(passport);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      models,
      req,
      res,

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
