import { useState } from 'react';
import { addVenda, updateVenda } from '../api/apiVenda';
import { toast } from 'react-toastify';

const useVendaForm = (refreshVendas) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedVenda, setSelectedVenda] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModalOpen = () => {
        setSelectedVenda(null);
        setEditing(false);
        setModalOpen(true);
    };

    const handleEditModalOpen = (venda) => {
        setSelectedVenda(venda);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSave = async (nome, descricao, categoria, tamanho, estoque_atual) => {
        console.log(`${nome}, ${descricao}, ${categoria}, ${tamanho}, ${estoque_atual}`)

        if (!nome || !descricao || !categoria || !tamanho || !estoque_atual) {
            toast.error("Todos os campos são obrigatórios.");
            return;
        }

        setLoading(true);
        try {
            if (isEditing) {
                await updateVenda(selectedVenda.id, { nome, descricao, categoria, tamanho, estoque_atual });
                toast.success('Venda atualizada com sucesso!');
            } else {
                await addVenda({ nome, descricao, categoria, tamanho, estoque_atual });
                toast.success('Venda adicionada com sucesso!');
            }
            refreshVendas();
        } catch (error) {
            toast.error("Erro ao salvar a venda.");
        } finally {
            setLoading(false);
            setModalOpen(false);
        }
    };

    return {
        isModalOpen,
        setModalOpen,
        selectedVenda,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    };
};

export default useVendaForm;
