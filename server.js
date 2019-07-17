require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      const authToken = req.headers.authorization;

      if (authToken) {
        currentUser = await authToken;
        console.log("currentUser", currentUser);
      }
    } catch (error) {
      console.error(`some problem with ${authToken}`);
    }
    return { currentUser };
  }
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(console.log("connect to the database"))
  .catch(err => console.error(err));

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
