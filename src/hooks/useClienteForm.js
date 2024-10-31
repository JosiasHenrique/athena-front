import { useState } from 'react';
import { addCliente, updateCliente } from '../api/apiCliente';
import { toast } from 'react-toastify';

const useClienteForm = (refreshClientes) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleModalOpen = () => {
        setSelectedCliente(null);
        setEditing(false);
        setModalOpen(true);
    };

    const handleEditModalOpen = (cliente) => {
        setSelectedCliente(cliente);
        setEditing(true);
        setModalOpen(true);
    };

    const handleSave = async (nome, telefone, email) => {

        setLoading(true);
        try {
            if (isEditing) {
                await updateCliente(selectedCliente.id, { nome, telefone, email });
                toast.success('Cliente atualizado com sucesso!');
            } else {
                await addCliente({ nome, telefone, email });
                toast.success('Cliente adicionado com sucesso!');
            }
            refreshClientes();
        } catch (error) {
            toast.error(error.message || "Ocorreu um erro inesperado. Tente novamente.", {
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
        selectedCliente,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    };
};

export default useClienteForm;
