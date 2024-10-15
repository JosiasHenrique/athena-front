import { addVenda } from '../api/apiVenda';
import { toast } from 'react-toastify'; 
import { useState } from 'react';
import { useVenda } from '../context/VendaContext';

const useVendaForm = (refreshVendas, onClose) => {
    const [loading, setLoading] = useState(false);
    const { resetVenda } = useVenda();

    const handleSave = async (venda) => {
        if (!venda.tipo_pagamento || !venda.data_venda || !venda.id_revendedor || !venda.id_cliente || venda.produtos.length === 0) {
            toast.error("Todos os campos são obrigatórios.");
            return;
        }
    
        setLoading(true); 
        try {
            await addVenda({
                tipo_pagamento: venda.tipo_pagamento,
                data_venda: venda.data_venda,
                id_revendedor: venda.id_revendedor,
                id_cliente: venda.id_cliente,
                itens: venda.produtos.map(produto => ({
                    id_produto: produto.id,
                    quantidade: produto.quantidade,
                    valor_unitario: produto.valor_unitario,
                    valor_total: produto.valor_total,
                    valor_comissao: produto.valor_comissao,
                })),
            });
            toast.success('Venda registrada com sucesso!');
            refreshVendas(); 
            resetVenda();
            onClose();
        } catch (error) {
            console.error('Erro ao registrar a venda:', error);
            toast.error("Ocorreu um erro ao registrar a venda."); 
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSave,
        loading,
    };
};

export default useVendaForm;
