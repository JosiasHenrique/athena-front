import '../styles/dashboard.css';
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { fetchClientes, deleteCliente } from '../api/apiCliente';
import ModalCliente from './ModalCliente';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import useModalCliente from '../hooks/useModalCliente';

const TabelaClientes = () => {
    const [data, setData] = useState([]);
    
    const loadClientes = async () => {
        const clientes = await fetchClientes();
        setData(clientes);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
            try {
                await deleteCliente(id);
                setData((prevData) => prevData.filter((item) => item.id !== id));
                toast.success("Cliente excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir o cliente:", error);
                toast.error("Erro ao excluir o cliente."); 
            }
        }
    };

    const {
        isModalOpen,
        setModalOpen,
        selectedCliente,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    } = useModalCliente(loadClientes);

    useEffect(() => {
        loadClientes();
    }, []);

    return (
        <div className="container-tabela">
            <ToastContainer />
            <button onClick={handleModalOpen} className="bg-pink-500 text-white p-2 rounded mb-4">
                <PlusIcon className="h-5 w-5 inline" /> Adicionar Cliente
            </button>
            <table className="table-auto border-separate border-spacing-y-3">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Telefone</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-sm">
                            <td className="px-2 py-2 text-center text-sm font-medium text-gray-900">{item.id}</td>
                            <td className="px-2 py-2 text-center text-sm text-gray-900">{item.nome}</td>
                            <td className="px-2 py-2 text-center text-sm text-gray-500">{item.telefone}</td>
                            <td className="px-2 py-2 text-center text-sm text-gray-500">{item.email}</td>
                            <td className="px-2 py-2 text-center text-sm font-medium">
                                <div className="flex justify-center">
                                    <button className="btn-action text-gray-400 mr-2">
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        className="btn-action text-gray-400 mr-2" 
                                        onClick={() => handleEditModalOpen(item)}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button  onClick={() => handleDelete(item.id)} className="btn-action text-gray-400">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalCliente 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                cliente={selectedCliente} 
                isEditing={isEditing} 
                onSave={handleSave}
                loading={loading} 
            />
        </div>
    );
};

export default TabelaClientes;
