import '../styles/dashboard.css';
import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { fetchProdutos, deleteProduto } from '../api/apiProduto';
import ModalProduto from './ModalProduto';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useProduto from '../hooks/useProduto';
import ModalDelete from './ModalDelete';

const TabelaProdutos = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRevendedorId, setSelectedRevendedorId] = useState(null);

    const loadProdutos = async () => {
        const produtos = await fetchProdutos();
        setData(produtos);
    };

    const confirmDelete = async () => {
        if (selectedRevendedorId) {
            try {
                await deleteProduto(selectedRevendedorId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedRevendedorId));
                toast.success("Revendedor excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir o revendedor:", error);
                toast.error("Erro ao excluir o revendedor.");
            } finally {
                setIsModalOpen(false);
                setSelectedRevendedorId(null);
            }
        }
    };

    const {
        isModalOpen: isEditModalOpen,
        setModalOpen,
        selectedProduto,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    } = useProduto(loadProdutos);

    useEffect(() => {
        loadProdutos();
    }, []);

    const filteredData = data.filter((item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button onClick={handleModalOpen} className="bg-athena text-white p-2 rounded mb-4">
                    <PlusIcon className="h-5 w-5 inline" /> Novo Produto
                </button>

                <input
                    type="text"
                    placeholder="Pesquisar produto por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />
            </div>
            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhum produto encontrado.</p>
            ) : (
                <table className="table-auto border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Nome</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Descrição</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Categoria</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Tamanho</th>
                            <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Estoque Atual</th>
                            <th className="px-2 py-2 text-center text-xs font-medium text-black uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-sm">
                                <td className="px-2 py-2 text-left text-sm text-gray-900">{item.nome}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.descricao}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.categoria}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.tamanho}</td>
                                <td className="px-2 py-2 text-left text-sm text-gray-500">{item.estoque_atual}</td>
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
                                            setSelectedRevendedorId(item.id);
                                            setIsModalOpen(true);
                                        }} F className="btn-action text-gray-400 px-2 py-2">
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ModalProduto
                isOpen={isEditModalOpen}
                onClose={() => setModalOpen(false)}
                produto={selectedProduto}
                isEditing={isEditing}
                onSave={handleSave}
                loading={loading}
            />
            <ModalDelete
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                item="produto"
            />
        </div>
    );
};

export default TabelaProdutos;
