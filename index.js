const {ApolloServer, graphql} = require('apollo-server');

const vendasSchema = require('./vendas/schema/vendas.graphql');
const commonSchema = require('./common/schema/common.graphql');
const commonResolvers = require('./common/resolvers/commonResolvers');
const vendasResolvers = require('./vendas/resolvers/vendasResolvers');
const VendasAPI = require('./vendas/datasource/vendas');

const typeDefs = [vendasSchema, commonSchema];
const resolvers = [vendasResolvers, commonResolvers];

const server = new ApolloServer({
    typeDefs,
    resolvers,
    resolverValidationOptions : {
        requireResolversForResolveType: false
    },
    dataSources: () => {
        return {
            vendasAPI: new VendasAPI()
        }
    },
    debug: false,
    introspection: true,  
    playground: true
});

server
    .listen({port: process.env.port || 4000})
    .then(({url}) => {
        console.log(`graphQl running at ${url}`);
    })