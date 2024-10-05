import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { fetchClientes, deleteCliente } from '../../api/apiCliente';
import ModalCliente from './ModalCliente';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useClienteForm  from '../../hooks/useClienteForm';
import ModalDelete from '../ModalDelete';

const TabelaClientes = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedClienteId, setSelectedClienteId] = useState(null);

    const loadClientes = async () => {
        const clientes = await fetchClientes();
        setData(clientes);
    };

    const confirmDelete = async () => {
        if (selectedClienteId) {
            try {
                await deleteCliente(selectedClienteId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedClienteId));
                toast.success("Cliente excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir o cliente:", error);
                toast.error("Erro ao excluir o cliente.");
            } finally {
                setIsModalDeleteOpen(false);
                setSelectedClienteId(null);
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
    } = useClienteForm(loadClientes);

    useEffect(() => {
        loadClientes();
    }, []);

    const filteredData = data.filter((item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.telefone.includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button onClick={handleModalOpen} className="bg-athena text-white p-2 rounded mb-4">
                    <PlusIcon className="h-5 w-5 inline" /> Novo Cliente
                </button>

                <input
                    type="text"
                    placeholder="Pesquisar cliente"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />

            </div>

            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhum cliente encontrado.</p>
            ) : (
                <table className="table-auto border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Nome</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Telefone</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Id</th>
                            <th className="px-2 py-2 text-center text-xs font-medium text-black uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-sm">
                                <td className="px-2 py-2 text-left text-sm text-gray-900">{item.nome}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.telefone}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.email}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.id}</td>
                                <td className="px-2 py-2 text-center text-sm font-medium">
                                    <div className="flex justify-center">
                                        <button className="btn-action text-gray-400 mr-2 px-2 py-2">
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            className="btn-action text-gray-400 mr-2 px-2 py-2"
                                            onClick={() => handleEditModalOpen(item)}
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => {
                                            setSelectedClienteId(item.id);
                                            setIsModalDeleteOpen(true);
                                        }} className="btn-action text-gray-400 px-2 py-2">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <ModalCliente
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                cliente={selectedCliente}
                isEditing={isEditing}
                onSave={handleSave}
                loading={loading}
            />
            <ModalDelete
                isOpen={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                onConfirm={confirmDelete}
                item="cliente"
            />
        </div>
    );
};

export default TabelaClientes;
