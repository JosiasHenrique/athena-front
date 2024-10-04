import { useState } from 'react';
import { addRevendedor, updateRevendedor } from '../api/apiRevendedor';
import { toast } from 'react-toastify';

const useRevendedor = (refreshRevendedores) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRevendedor, setSelectedRevendedor] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModalOpen = () => {
        setSelectedRevendedor(null);
        setEditing(false);
        setModalOpen(true);
    };

    const handleEditModalOpen = (revendedor) => {
        setSelectedRevendedor(revendedor);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSave = async (nome, contato, comissao) => {
        if (!nome || !contato || !comissao) {
            toast.error("Todos os campos são obrigatórios.");
            return;
        }

        setLoading(true);
        try {
            if (isEditing) {
                await updateRevendedor(selectedRevendedor.id, { nome, contato, comissao });
                toast.success('Revendedor atualizado com sucesso!');
            } else {
                await addRevendedor({ nome, contato, comissao });
                toast.success('Revendedor adicionado com sucesso!');
            }
            refreshRevendedores();
        } catch (error) {
            toast.error("Erro ao salvar o revendedor.");
        } finally {
            setLoading(false);
            setModalOpen(false);
        }
    };

    return {
        isModalOpen,
        setModalOpen,
        selectedRevendedor,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    };
};

export default useRevendedor;
