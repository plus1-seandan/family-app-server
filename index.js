const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

const main = async () => {
  //set db connection

  const app = express();
  app.use(cors());

  const apolloServer = new ApolloServer({
    // schema: await buildSchema({
    //   resolvers: [HelloResolver, PostResolver, UserResolver],
    //   validate: false,
    // }),
    // context: ({ req, res }) => ({
    //   req,
    //   res,
    //   redis,
    //   userLoader: createUserLoader(),
    //   updootLoader: createUpdootLoader(),
    // }),
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
