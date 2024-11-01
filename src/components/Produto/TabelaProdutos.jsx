import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { fetchProdutos, deleteProduto } from '../../api/apiProduto';
import ModalProduto from './ModalProduto';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useProdutoForm from '../../hooks/useProdutoForm';
import ModalDelete from '../ModalDelete';

const TabelaProdutos = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedProdutoId, setSelectedProdutoId] = useState(null);

    const loadProdutos = async () => {
        const produtos = await fetchProdutos();
        setData(produtos);
    };

    const confirmDelete = async () => {
        if (selectedProdutoId) {
            try {
                await deleteProduto(selectedProdutoId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedProdutoId));
                toast.success("Produto excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir o Produto:", error);
                toast.error("Erro ao excluir o Produto.");
            } finally {
                setIsModalDeleteOpen(false);
                setSelectedProdutoId(null);
            }
        }
    };

    const {
        isModalOpen,
        setModalOpen,
        selectedProduto,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    } = useProdutoForm(loadProdutos);

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
                <button onClick={handleModalOpen} className="text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena">
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
                <div className="overflow-x-auto w-full">
                    <table className="table-auto border-separate border-spacing-y-3 mx-auto">
                        <thead>
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Nome</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Descrição</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Categoria</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Tamanho</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Estoque</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id} className='tb-athena'>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">{item.nome}</td>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">{item.descricao}</td>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">{item.categoria}</td>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">{item.tamanho}</td>
                                    <td className={`px-2 py-2 text-center text-sm ${item.estoque_atual <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                                        {item.estoque_atual}
                                    </td>
                                    <td className="px-2 py-2 text-center text-sm font-medium">
                                        <div className="flex justify-center">
                                            <button
                                                className="btn-action text-gray-400 mr-2 px-2 py-2"
                                                onClick={() => handleEditModalOpen(item)}
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button onClick={() => {
                                                setSelectedProdutoId(item.id);
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
                </div>
            )}
            <ModalProduto
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                produto={selectedProduto}
                isEditing={isEditing}
                onSave={handleSave}
                loading={loading}
            />
            <ModalDelete
                isOpen={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                onConfirm={confirmDelete}
                item="produto"
            />
        </div>
    );
};

export default TabelaProdutos;
