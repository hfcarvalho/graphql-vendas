const {RESTDataSource} = require('apollo-datasource-rest');

class VendasAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = 'http://localhost:3000'
        this.customResponse = {
            code: 200,
            message: "success"
        }
    }

    async getClientes(){
        const clientes = await this.get('/clientes')
        return clientes.map(async cliente => ({
            codigo: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            ativo: cliente.ativo,
            dataNascimento: cliente.dataNascimento,
            vendas: await this.get(`/vendas?codigoCliente=${cliente.codigo}`)
        }))
    }

    async getVendas(){
        const vendas = await this.get('/vendas')
        return vendas.map(async venda => ({
            id: venda.id,
            data: venda.data,
            cliente: await this.get(`/clientes/${venda.codigoCliente}`),
            status: venda.status
        }))
    }

    async getVendasPorStatus(status){
        const vendas = await this.get(`/vendas?status=${status}`)
        return vendas.map(async venda => ({
            id: venda.id,
            data: venda.data,
            cliente: await this.get(`/clientes/${venda.codigoCliente}`),
            status: venda.status
        }))
    }

    async getVendasPorCliente(codigoCliente){
        const vendas = await this.get(`/vendas?codigoCliente=${codigoCliente}`)
        return vendas.map(async venda => ({
            id: venda.id,
            data: venda.data,
            cliente: await this.get(`/clientes/${venda.codigoCliente}`),
            status: venda.status
        }))
    }

    async getClientePorCodigo(id){
        const cliente = await this.get(`/clientes/${id}`);
        cliente.codigo = cliente.id;
        const vendas = await this.get(`/vendas?codigoCliente=${cliente.id}`)
        cliente.vendas = vendas.map(async venda => ({
            id: venda.id,
            data: venda.data,
            //cliente: await this.get(`/clientes/${venda.codigoCliente}`),
            status: venda.status
        }));
        return cliente
    }

    async addCliente(cliente){
        const clientes = await this.get('/clientes')
        cliente.codigo = clientes.length + 1
        const venda = await this.get(`/vendas?codigoCliente=${cliente.codigo}`)
        await this.post('clientes', {...cliente})
        return ({
            ...cliente
        })
    }

    async alterCliente(obj){
        const venda = await this.get(`/vendas?codigoCliente=${obj.id}`)
        await this.put(`clientes/${obj.id}`, {...obj.cliente})
        return ({
            ...this.customResponse,
            cliente: {
                ...obj.cliente
            }
        })
    }

    async deleteCliente(codigo){
        await this.delete(`clientes/${codigo}`)
        return this.customResponse
    }
}

module.exports = VendasAPI;