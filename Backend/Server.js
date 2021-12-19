const { ApolloServer } = require('apollo-server');
const { MONGODB } = require('./config.js');
const mongoose = require('mongoose');

const resolvers = require('./GraphQL/Resolvers');
const typeDefs = require('./GraphQL/TypeDefs');

var corsOptions = {
  origin: '*',
  credentials: true,
};

const server = new ApolloServer({
  cors: corsOptions,
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB Connected...');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  });
