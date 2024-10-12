import api from './api';

export const fetchRevendedores = async () => {
    try {
        const response = await api.get('/revendedores');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os revendedores:", error);
        throw error;
    }
};

export const fetchRevendedorById = async (id) => {
    try {
        const response = await api.get(`/revendedores/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar o revendedor com ID ${id}:`, error);
        throw error;
    }
};

export const addRevendedor = async (revendedor) => {
    try {
        await api.post('/revendedores', revendedor);
    } catch (error) {
        console.error("Erro ao adicionar o revendedor:", error);
        throw error;
    }
};

export const updateRevendedor = async (id, revendedor) => {
    try {
        await api.patch(`/revendedores/${id}`, revendedor);
    } catch (error) {
        console.error("Erro ao atualizar o cliente:", error);
        throw error;
    }
};

export const deleteRevendedor = async (id) => {
    try {
        await api.delete(`/revendedores/${id}`);
    } catch (error) {
        console.error("Erro ao deletar o revendedor:", error);
        throw error;
    }
};

