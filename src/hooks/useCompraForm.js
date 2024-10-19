import { addCompra, updateCompra } from '../api/apiCompra';
import { toast } from 'react-toastify'; 
import { useState } from 'react';
import { useCompra } from '../context/CompraContext';

const useCompraForm = (refreshCompras, onClose, isEditing) => {
    const [loading, setLoading] = useState(false);
    const { resetCompra } = useCompra();

    const handleSave = async (compra) => {
        if (!compra.numero_nota || !compra.fornecedor || !compra.data_compra || compra.itens.length === 0) {
            toast.error("Todos os campos são obrigatórios.", {
                theme: "colored"
            });
            return;
        }
    
        setLoading(true); 
        try {
            if (isEditing) {      
                await updateCompra(compra.id, { 
                    numero_nota: compra.numero_nota,
                    fornecedor: compra.fornecedor,
                    data_compra: compra.data_compra,
                    itens: compra.itens.map(item => ({
                        id: item.id,
                        quantidade: item.quantidade,
                        valor_unitario: item.valor_unitario,
                        valor_total: item.valor_total
                    })),
                });
                toast.success('Compra atualizada com sucesso!');
            } else {
                await addCompra({
                    numero_nota: compra.numero_nota,
                    fornecedor: compra.fornecedor,
                    data_compra: compra.data_compra,
                    itens: compra.itens.map(item => ({
                        id: item.id,
                        quantidade: item.quantidade,
                        valor_unitario: item.valor_unitario,
                        valor_total: item.valor_total
                    })),
                });
                toast.success('Compra registrada com sucesso!');
            }
            refreshCompras(); 
            resetCompra();
            onClose();
        } catch (error) {
            console.error('Erro ao salvar a compra:', error);
            toast.error(error.message, {
                theme: "colored"
            }); 
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSave,
        loading,
    };
};

export default useCompraForm;
