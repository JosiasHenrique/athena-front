import { useState } from 'react';
import { addCompra, updateCompra } from '../api/apiCompra';
import { toast } from 'react-toastify';

const useCompraForm = (refreshCompras) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCompra, setSelectedCompra] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModalOpen = () => {
        setSelectedCompra(null);
        setEditing(false);
        setModalOpen(true);
    };

    const handleEditModalOpen = (compra) => {
        setSelectedCompra(compra);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSave = async (numeroNota, fornecedor, dataCompra, itens ) => {

        if (!numeroNota || !fornecedor || !dataCompra || itens.length === 0) {
            toast.error("Todos os campos são obrigatórios e deve haver pelo menos um item.");
            return;
        }

        const compraData = {
            numero_nota: numeroNota,
            fornecedor,
            data_compra: dataCompra,
            itens: itens.map(item => ({
                id_produto: item.id_produto,
                quantidade: item.quantidade,
                valor_unitario: item.valor_unitario,
                valor_total: item.valor_total
            }))
        };
    
        setLoading(true);
        try {
            if (isEditing) {
                await updateCompra(selectedCompra.id, compraData);
                toast.success('Compra atualizada com sucesso!');
            } else {
                await addCompra(compraData);
                toast.success('Compra adicionada com sucesso!');
            }
            refreshCompras();
        } catch (error) {
            toast.error("Erro ao salvar a compra.");
        } finally {
            setLoading(false);
            setModalOpen(false);
        }
    };
    

    return {
        isModalOpen,
        setModalOpen,
        selectedCompra,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    };
};

export default useCompraForm;
