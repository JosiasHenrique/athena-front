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

export const updateVenda= async (id, compra) => {
    try {
        await api.patch(`/vendas/${id}`, compra);
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

export const gerarRelatorioVendas = async (startDate, endDate) => {
    try {
        const response = await api.get('/relatorios/vendas', {
            params: { startDate, endDate }, 
            responseType: 'blob',
        });

        if (response.status !== 200) {
            throw new Error('Erro ao gerar o relatório.');
        }

        // Cria a URL do blob e aciona o download automaticamente
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio-vendas-${startDate}-${endDate}.xlsx`; // Nome do arquivo Excel
        document.body.appendChild(a); // Adiciona o link ao DOM
        a.click(); // Simula o clique no link para iniciar o download
        a.remove(); // Remove o link temporário

        // Libera a URL após o download
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Erro ao gerar o relatório de vendas:", error);
        throw error;
    }
};
