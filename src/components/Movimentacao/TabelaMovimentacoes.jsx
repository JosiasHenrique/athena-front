import { useEffect, useState } from 'react';
import { fetchMovimentacoes, deleteMovimentacao } from '../../api/apiMovimentacao';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from '../ModalDelete';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import ModalMovimentacao from './ModalMovimentacao';
import { useMovimentacao } from '../../context/MovimentacaoContext';

const TabelaMovimentacoes = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalMovOpen, setIsModalMovOpen] = useState(false);
    const [isModalEditing, setIsModalEditing] = useState(false);
    const [selectedMovimentacaoId, setSelectedMovimentacaoId] = useState(null);
    const { atualizarMovimentacao, resetMovimentacao } = useMovimentacao();

    const loadMovimentacoes = async () => {
        const movimentacoes = await fetchMovimentacoes();
        setData(movimentacoes);
    };

    const confirmDelete = async () => {
        if (selectedMovimentacaoId) {
            try {
                await deleteMovimentacao(selectedMovimentacaoId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedMovimentacaoId));
                toast.success("Movimentação excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir a movimentação:", error);
                toast.error("Erro ao excluir a movimentação.");
            } finally {
                setIsModalOpen(false);
                setSelectedMovimentacaoId(null);
            }
        }
    };

    useEffect(() => {
        loadMovimentacoes();
    }, []);

    const filteredData = data.filter((item) =>
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calcularQuantidadeTotalItens = (itens) => {
        return itens.reduce((total, item) => total + item.quantidade, 0);
    };


    const iniciarNovaMovimentacao = () => {
        setIsModalEditing(false);
        resetMovimentacao();
        setIsModalMovOpen(true);
    };

    const carregarMovimentacaoParaEdicao = (item) => {
        setIsModalEditing(true);
        setIsModalMovOpen(true);
        atualizarMovimentacao('id', item.id);
        
        atualizarMovimentacao('descricao', item.descricao);
        atualizarMovimentacao('data_movimentacao', item.data_movimentacao);
        atualizarMovimentacao('itens', item.itens);
    };


    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button
                    className="text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena"
                    onClick={() => iniciarNovaMovimentacao()}
                >
                    <PlusIcon className="h-5 w-5 inline" /> Nova Movimentação
                </button>
                <input
                    type="text"
                    placeholder="Pesquisar movimentação por descrição"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />
            </div>
            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhuma movimentação encontrada.</p>
            ) : (
                <table className="table-auto border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Data da Movimentação</th>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Descrição</th>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Quantidade de Itens</th>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className='tb-athena'>
                                <td className="px-2 py-2 text-center text-sm text-gray-900">{item.data_movimentacao}</td>
                                <td className="px-2 py-2 text-center text-sm text-gray-900">{item.descricao}</td>
                                <td className="px-2 py-2 text-center text-sm text-gray-900">{calcularQuantidadeTotalItens(item.itens)}</td>
                                <td className="px-2 py-2 text-center text-sm font-medium">
                                    <div className="flex justify-center">
                                        <button onClick={() => carregarMovimentacaoParaEdicao(item)}
                                            className="btn-action text-gray-400 mr-2 px-2 py-2"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            className="btn-action text-gray-400 px-2 py-2"
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setSelectedMovimentacaoId(item.id);
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
            )}
            <ModalDelete
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                item="movimentação"
            />

             <ModalMovimentacao
                isOpen={isModalMovOpen}
                onClose={() => setIsModalMovOpen(false)}
                refreshMovimentacoes={loadMovimentacoes}
                isEditing={isModalEditing}
            />

        </div>
    );
};

export default TabelaMovimentacoes;
