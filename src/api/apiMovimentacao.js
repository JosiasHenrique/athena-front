import api from './api';

export const fetchMovimentacoes = async () => {
    try {
        const response = await api.get('/movimentacoes');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
        throw error;
    }
};

export const addMovimentacao = async (movimentacao) => {
    try {
        await api.post('/movimentacoes', movimentacao);
    } catch (error) {
        console.error("Erro ao adicionar a movimentação:", error);
        throw error;
    }
};

export const updateMovimentacao = async (id, movimentacao) => {
    try {
        await api.patch(`/movimentacoes/${id}`, movimentacao);
    } catch (error) {
        console.error("Erro ao atualizar a movimentação:", error);
        throw error;
    }
};

export const deleteMovimentacao = async (id) => {
    try {
        await api.delete(`/movimentacoes/${id}`);
    } catch (error) {
        console.error("Erro ao deletar a movimentação:", error);
        throw error;
    }
};
