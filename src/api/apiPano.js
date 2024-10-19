import api from './api';

export const fetchPanos = async () => {
    try {
        const response = await api.get('/panos');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar panos:", error);
        throw error;
    }
};

export const addPano = async (pano) => {
    try {
        await api.post('/panos', pano);
    } catch (error) {
        console.error("Erro ao adicionar o pano:", error);
        throw error;
    }
};

export const updatePano = async (id, pano) => {
    try {
        await api.patch(`/panos/${id}`, pano);
    } catch (error) {
        console.error("Erro ao atualizar o pano:", error);
        throw error;
    }
};

export const deletePano = async (id) => {
    try {
        await api.delete(`/panos/${id}`);
    } catch (error) {
        console.error("Erro ao deletar o pano:", error);
        throw error;
    }
};
