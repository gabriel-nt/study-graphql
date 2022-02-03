import mongoose from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { ApolloServer, PubSub } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

function startServer({ typeDefs, resolvers }) {
  mongoose.connect('mongodb://localhost:27017/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const pubsub = new PubSub();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      pubsub,
    },
    playground: {
      subscriptionEndpoint: 'ws://localhost:4000/graphql',
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  server.listen().then(({ url }) => console.log(`Server started at ${url}`));
}

export default startServer;
