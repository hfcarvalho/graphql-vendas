const {GraphQLScalarType} = require('graphql')

const commonResolvers = {
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'date time string at format ISO-8601',
        //get data source
        serialize: (value) => value.toISOString(),
        //get input
        parseValue: (value) => new Date(value),
        //used to values from variables
        parseLiteral: (ast) => new Date(ast.value)
    })
}

module.exports = commonResolvers;