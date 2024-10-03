import api from './api';

export const fetchClientes = async () => {
    try {
        const response = await api.get('/clientes');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os clientes:", error);
        throw error;
    }
};

export const addCliente = async (cliente) => {
    try {
        await api.post('/clientes', cliente);
    } catch (error) {
        console.error("Erro ao adicionar o cliente:", error);
        throw error;
    }
};

export const updateCliente = async (id, cliente) => {
    try {
        await api.patch(`/clientes/${id}`, cliente);
    } catch (error) {
        console.error("Erro ao atualizar o cliente:", error);
        throw error;
    }
};

export const deleteCliente = async (id) => {
    try {
        await api.delete(`/clientes/${id}`);
    } catch (error) {
        console.error("Erro ao deletar o cliente:", error);
        throw error;
    }
};

