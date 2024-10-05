import api from './api';

export const fetchVendas = async () => {
    try {
        const response = await api.get('/vendas');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar vendas :", error);
        throw error;
    }
};

export const addVenda = async (venda) => {
    try {
        await api.post('/vendas', venda);
    } catch (error) {
        console.error("Erro ao adicionar a venda:", error);
        throw error;
    }
};

export const updateVenda= async (id, revendedor) => {
    try {
        await api.patch(`/vendas/${id}`, revendedor);
    } catch (error) {
        console.error("Erro ao atualizar a venda:", error);
        throw error;
    }
};

export const deleteVenda = async (id) => {
    try {
        await api.delete(`/vendas/${id}`);
    } catch (error) {
        console.error("Erro ao deletar a venda:", error);
        throw error;
    }
};