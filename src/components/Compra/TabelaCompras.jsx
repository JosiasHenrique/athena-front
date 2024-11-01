import { useEffect, useState } from 'react';
import { fetchCompras, deleteCompra } from '../../api/apiCompra';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from '../ModalDelete';
import ModalCompra from './ModalCompra';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useCompra } from '../../context/CompraContext';

const TabelaCompras = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditing, setIsModalEditing] = useState(false);
    const [isModalCompraOpen, setIsModalCompraOpen] = useState(false);
    const [selectedCompraId, setSelectedCompraId] = useState(null);
    const { atualizarCompra, resetCompra } = useCompra();


    const loadCompras = async () => {
        const compras = await fetchCompras();
        setData(compras);
    };

    const confirmDelete = async () => {
        if (selectedCompraId) {
            try {
                await deleteCompra(selectedCompraId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedCompraId));
                toast.success("Compra excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir a compra:", error);
                toast.error("Erro ao excluir a compra.");
            } finally {
                setIsModalOpen(false);
                setSelectedCompraId(null);
            }
        }
    };

    useEffect(() => {
        loadCompras();
    }, []);

    const filteredData = data.filter((item) =>
        item.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const iniciarNovaCompra = () => {
        setIsModalEditing(false);
        resetCompra();
        setIsModalCompraOpen(true);
    };

    const carregarCompraParaEdicao = (item) => {
        setIsModalEditing(true);
        setIsModalCompraOpen(true);
        atualizarCompra('id', item.id);
        atualizarCompra('numero_nota', item.numero_nota);
        atualizarCompra('fornecedor', item.fornecedor);
        atualizarCompra('data_compra', item.data_compra);
        atualizarCompra('itens', item.itens);
    };

    const calcularTotalCompra = (itens) => {
        return itens.reduce((total, item) => total + item.quantidade * item.valor_unitario, 0).toFixed(2);
    };

    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button
                    className="text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena"
                    onClick={() => iniciarNovaCompra()}
                >
                    <PlusIcon className="h-5 w-5 inline" /> Nova Compra
                </button>

                <input
                    type="text"
                    placeholder="Pesquisar compra por fornecedor"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />
            </div>
            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhuma compra encontrada.</p>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="table-auto border-separate border-spacing-y-3 mx-auto">
                        <thead>
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Data da Compra</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Número da Nota</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Fornecedor</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Total da Compra</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id} className='tb-athena'>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">{new Date(item.data_compra).toLocaleDateString('pt-BR')}</td>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">{item.numero_nota}</td>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">{item.fornecedor}</td>
                                    <td className="px-2 py-2 text-center text-sm text-gray-900">R$ {calcularTotalCompra(item.itens)}</td>
                                    <td className="px-2 py-2 text-center text-sm font-medium">
                                        <div className="flex justify-center">
                                            <button onClick={() => carregarCompraParaEdicao(item)}
                                                className="btn-action text-gray-400 mr-2 px-2 py-2"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                className="btn-action text-gray-400 px-2 py-2"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setSelectedCompraId(item.id);
                                                }}
                                            >
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
            <ModalDelete
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                item="compra"
            />
            <ModalCompra
                isOpen={isModalCompraOpen}
                onClose={() => setIsModalCompraOpen(false)}
                refreshCompras={loadCompras}
                isEditing={isModalEditing}
            />
        </div>
    );
};

export default TabelaCompras;
