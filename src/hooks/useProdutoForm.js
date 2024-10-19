import { useState } from 'react';
import { addProduto, updateProduto } from '../api/apiProduto';
import { toast } from 'react-toastify';

const useProdutoForm = (refreshProdutos) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedProduto, setSelectedProduto] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModalOpen = () => {
        setSelectedProduto(null);
        setEditing(false);
        setModalOpen(true);
    };

    const handleEditModalOpen = (produto) => {
        setSelectedProduto(produto);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSave = async (nome, descricao, categoria, tamanho, estoque_atual) => {
        console.log(`${nome}, ${descricao}, ${categoria}, ${tamanho}, ${estoque_atual}`)

        if (!nome || !descricao || !categoria || !tamanho || !estoque_atual) {
            toast.error("Todos os campos são obrigatórios.", {
                theme: "colored"
            });
            return;
        }

        setLoading(true);
        try {
            if (isEditing) {
                await updateProduto(selectedProduto.id, { nome, descricao, categoria, tamanho, estoque_atual });
                toast.success('Produto atualizado com sucesso!');
            } else {
                await addProduto({ nome, descricao, categoria, tamanho, estoque_atual });
                toast.success('Produto adicionado com sucesso!');
            }
            refreshProdutos();
        } catch (error) {
            toast.error(error.message, {
                theme: "colored"
            });
        } finally {
            setLoading(false);
            setModalOpen(false);
        }
    };

    return {
        isModalOpen,
        setModalOpen,
        selectedProduto,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    };
};

export default useProdutoForm;
