const express = require("express");
const cors = require("cors");
const { ApolloServer, PubSub } = require("apollo-server-express");
const passport = require("passport");
const { execute, subscribe } = require("graphql");
const bodyParser = require("body-parser");
const { verify, decode } = require("jsonwebtoken");
const { apolloUploadExpress } = require("apollo-upload-server");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const http = require("http");
require("dotenv").config();

const db = require("./models/db");
const models = require("./models");
const schema = require("./graphql");
const setupPassport = require("./config/passport");
const { getUser } = require("./utils/user");

const main = async () => {
  PORT = 4000;
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
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const data = verify(token, process.env.SECRET_KEY);
      req.userId = data.userId;
    } catch (e) {
      console.log("NOT LOGGED IN ");
    }
    next();
  });

  app.use(express.static("public"));
  const pubsub = new PubSub();

  const apolloServer = new ApolloServer({
    schema,
    subscriptions: {
      onConnect: async (connectionParams, webSocket) => {
        const authHeader = connectionParams.headers.Authorization;
        const token = authHeader.split(" ")[1];
        const data = verify(token, process.env.SECRET_KEY);
        const userId = data.userId;
        return { pubsub, models, userId };
      },
    },
    context: async ({ req, res, connection }) => {
      if (connection) {
        return connection.context;
      } else {
        return {
          models,
          req,
          res,
          pubsub,
        };
      }
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  }); //this will create graphql endpoint for us in express
  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  // app.listen(parseInt(process.env.PORT), () => {
  //   console.log(`server started on localhost:${process.env.PORT}`);
  // });
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    );
  });

  //   const server = createServer(app);
  //   server.listen(PORT, () => {
  //     new SubscriptionServer(
  //       {
  //         execute,
  //         subscribe,
  //         schema,
  //       },
  //       {
  //         server: server,
  //         path: "/graphql",
  //       }
  //     );
  //     console.log(`server started on localhost:${process.env.PORT}`);
  //   });
};

main().catch((err) => {
  console.log(err);
});
