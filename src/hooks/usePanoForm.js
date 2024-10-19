import { addPano, updatePano } from '../api/apiPano';
import { toast } from 'react-toastify'; 
import { useState } from 'react';
import { usePano } from '../context/PanoContext';

const usePanoForm = (refreshPanos, onClose, isEditing) => {
    const [loading, setLoading] = useState(false);
    const { resetPano } = usePano();

    const handleSave = async (pano) => {
        if (!pano.id_revendedor || !pano.observacoes || pano.itens.length === 0) {
            toast.error("Todos os campos são obrigatórios.", {
                theme: "colored"
            });
            return;
        }
    
        setLoading(true); 
        try {
            if (isEditing) {      
                await updatePano(pano.id, { 
                    id_revendedor: pano.id_revendedor,
                    observacoes: pano.observacoes,
                    itens: pano.itens.map(item => ({
                        id_produto: item.id,
                        quantidade: item.quantidade,
                        valor_venda: item.valor_venda
                    })),
                });
                toast.success('Pano atualizado com sucesso!');
            } else {
                await addPano({
                    id_revendedor: pano.id_revendedor,
                    observacoes: pano.observacoes,
                    itens: pano.itens.map(item => ({
                        id_produto: item.id,
                        quantidade: item.quantidade,
                        valor_venda: item.valor_venda
                    })),
                });
                toast.success('Pano registrado com sucesso!');
            }
            refreshPanos(); 
            resetPano();
            onClose();
        } catch (error) {
            console.error('Erro ao salvar o pano:', error);
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

export default usePanoForm;
