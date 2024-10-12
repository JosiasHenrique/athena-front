import api from './api';

export const fetchCompras = async () => {
    try {
        const response = await api.get('/compras');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar compras:", error);
        throw error;
    }
};

export const addCompra = async (compra) => {
    try {
        await api.post('/compras', compra);
    } catch (error) {
        console.error("Erro ao adicionar a compra:", error);
        throw error;
    }
};

export const updateCompra = async (id, compra) => {
    try {
        await api.patch(`/compras/${id}`, compra);
    } catch (error) {
        console.error("Erro ao atualizar a compra:", error);
        throw error;
    }
};

export const deleteCompra = async (id) => {
    try {
        await api.delete(`/compras/${id}`);
    } catch (error) {
        console.error("Erro ao deletar a compra:", error);
        throw error;
    }
};
