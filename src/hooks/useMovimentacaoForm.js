import { addMovimentacao, updateMovimentacao } from '../api/apiMovimentacao';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useMovimentacao } from '../context/MovimentacaoContext';

const useMovimentacaoForm = (refreshMovimentacoes, onClose, isEditing) => {
    const [loading, setLoading] = useState(false);
    const { resetMovimentacao } = useMovimentacao();

    const handleSave = async (movimentacao) => {
        if (!movimentacao.data_movimentacao || !movimentacao.descricao || movimentacao.itens.length === 0) {
            toast.error("Todos os campos são obrigatórios.", {
                theme: "colored"
            });
            return;
        }
    
        setLoading(true);
        try {
            if (isEditing) {
                await updateMovimentacao(movimentacao.id, {
                    data_movimentacao: movimentacao.data_movimentacao,
                    descricao: movimentacao.descricao,
                    itens: movimentacao.itens.map(item => ({
                        id: item.id,
                        quantidade: item.quantidade,
                        tipo_movimentacao: item.tipo_movimentacao,
                        valor_unitario: item.valor_unitario,
                        valor_total: item.valor_total
                    })),
                });
                toast.success('Movimentação atualizada com sucesso!');
            } else {
                await addMovimentacao({
                    data_movimentacao: movimentacao.data_movimentacao,
                    descricao: movimentacao.descricao,
                    itens: movimentacao.itens.map(item => ({
                        id: item.id,
                        quantidade: item.quantidade,
                        tipo_movimentacao: item.tipo_movimentacao,
                        valor_unitario: item.valor_unitario,
                        valor_total: item.valor_total
                    })),
                });
                toast.success('Movimentação registrada com sucesso!');
            }
            refreshMovimentacoes();
            resetMovimentacao();
            onClose();
        } catch (error) {
            console.error('Erro ao salvar a movimentação:', error);
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

export default useMovimentacaoForm;
