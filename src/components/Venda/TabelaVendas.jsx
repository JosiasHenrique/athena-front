import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { fetchVendas, deleteVenda } from '../../api/apiVenda';
import ModalVenda from './ModalVenda';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useVendaForm from '../../hooks/useVendaForm';
import ModalDelete from '../ModalDelete';

const TabelaVendas = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendaId, setSelectedVendaId] = useState(null);

    const loadVendas = async () => {
        const vendas = await fetchVendas();
        setData(vendas);
    };

    const confirmDelete = async () => {
        if (selectedVendaId) {
            try {
                await deleteVenda(selectedVendaId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedVendaId));
                toast.success("Venda excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir a venda:", error);
                toast.error("Erro ao excluir a venda.");
            } finally {
                setIsModalOpen(false);
                setSelectedVendaId(null);
            }
        }
    };

    const {
        isModalOpen: isEditModalOpen,
        setModalOpen,
        selectedVenda,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    } = useVendaForm(loadVendas);

    useEffect(() => {
        loadVendas();
    }, []);

    const filteredData = data.filter((item) =>
        item.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.revendedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button onClick={handleModalOpen} className="bg-athena text-white p-2 rounded mb-4">
                    <PlusIcon className="h-5 w-5 inline" /> Nova Venda
                </button>

                <input
                    type="text"
                    placeholder="Pesquisar venda por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />
            </div>
            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhuma venda encontrada.</p>
            ) : (
                <table className="table-auto border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Data</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Pagamento</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Cliente</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Revendedor</th>
                            <th className="px-2 py-2 text-center text-xs font-medium text-black uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-sm">
                                <td className="px-2 py-2 text-left text-sm text-gray-900">{new Date(item.data_venda).toLocaleDateString('pt-BR')}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.tipo_pagamento}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.cliente.nome}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.revendedor.nome}</td>
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
                                        <button
                                            onClick={() => {
                                                setSelectedVendaId(item.id);
                                                setIsModalOpen(true);
                                            }}
                                            className="btn-action text-gray-400 px-2 py-2"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ModalVenda
                isOpen={isEditModalOpen}
                onClose={() => setModalOpen(false)}
                venda={selectedVenda}
                isEditing={isEditing}
                onSave={handleSave}
                loading={loading}
            />
            <ModalDelete
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                item="venda"
            />
        </div>
    );
};

export default TabelaVendas;
