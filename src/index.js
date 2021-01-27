const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const passport = require("passport");
const bodyParser = require("body-parser");
const { verify } = require("jsonwebtoken");

require("dotenv").config();

const db = require("./models/db");
const models = require("./models");
const schema = require("./graphql");
const setupPassport = require("./config/passport");

const main = async () => {
  //set db connection
  //sync database
  await db.sync({
    models,
    // force: true,
    alter: true,
  }); //force syncs database for development

  const app = express();
  //add express middleware
  app.use(cors());
  app.use(passport.initialize());
  setupPassport(passport);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use((req, _, next) => {
    const token = req.token;
    try {
      const data = verify(token, process.env.SECRET_KEY);
      req.userId = data.userId;
    } catch (e) {
      console.log("NOT LOGGED IN ");
    }
    next();
  });
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
