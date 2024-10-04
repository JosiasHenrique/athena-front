import api from './api';

export const fetchProdutos = async () => {
    try {
        const response = await api.get('/produtos');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        throw error;
    }
};

export const addProduto = async (produto) => {
    try {
        await api.post('/produtos', produto);
    } catch (error) {
        console.error("Erro ao adicionar o produto:", error);
        throw error;
    }
};

export const updateProduto = async (id, produto) => {
    try {
        await api.patch(`/produtos/${id}`, produto);
    } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
        throw error;
    }
};

export const deleteProduto = async (id) => {
    try {
        await api.delete(`/produtos/${id}`);
    } catch (error) {
        console.error("Erro ao deletar o produto:", error);
        throw error;
    }
};
