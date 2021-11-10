//um resolver para cada campo que tem no tipo, se não tiver ele tenta inferir com o mesmo nome
const vendasResolvers = {
    Query: {
        //vendas: () => arrayVendas
        //root/parent = trabalha com o resolver do nivel anterior, resultado da chamada anterior
        //args = o que passa para o resolver
        //context = o contexto para resolver, permissões, autenticação, etc
        //info = a representação em árvore da query ou da mutation
        //https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a
        clientes: (root, args, {dataSources}, info) => {
            return dataSources.vendasAPI.getClientes()
        },
        cliente: (root, {codigo}, {dataSources}) => {
            return dataSources.vendasAPI.getClientePorCodigo(codigo)
        },
        vendas: (root, args, {dataSources}) => {
            return dataSources.vendasAPI.getVendas()
        },
        vendasPorCliente: (root, {codigoCliente}, {dataSources}) => {
            return dataSources.vendasAPI.getVendasPorCliente(codigoCliente)
        },
        vendasPorStatus: (root, {status}, {dataSources}) => {
            return dataSources.vendasAPI.getVendasPorStatus(status)
        },
    },

    Mutation: {
        addCliente: (root, {cliente}, {dataSources}) => {
            return dataSources.vendasAPI.addCliente(cliente)
        },

        alterCliente: (root, cliente, {dataSources}) => {
            console.log(cliente);
            return dataSources.vendasAPI.alterCliente(cliente)
        },

        deleteCliente: (root, {codigo}, {dataSources}) => {
            return dataSources.vendasAPI.deleteCliente(codigo)
        }
    },

    CustomResponse: {
        __resolveType (obj, ctx, info) {
            return obj.__typename
        }
    }
}

module.exports = vendasResolvers;