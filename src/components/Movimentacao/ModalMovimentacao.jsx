import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import ResumoMovimentacao from './ResumoMovimentacao';
import { useMovimentacao } from '../../context/MovimentacaoContext';
import useMovimentacaoForm from '../../hooks/useMovimentacaoForm';
import SelectedProdutos from './SelectedProdutos';


const ModalMovimentacao = ({ isOpen, onClose, refreshMovimentacoes, isEditing }) => {
    const { movimentacao, atualizarMovimentacao } = useMovimentacao();
    const { handleSave, loading } = useMovimentacaoForm(refreshMovimentacoes, onClose, isEditing);

    const isMovimentacaoCompleta = () => {
        return (
            movimentacao.descricao ||
            movimentacao.data_movimentacao ||
            (movimentacao.itens && movimentacao.itens.length > 0)
        );
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 ">
                <div className="bg-gray-100 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-hidden ">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            {isEditing ? 'Editar Movimentação' : 'Inserir Nova Movimentação'}
                        </h2>
                        <button onClick={onClose} className="text-black p-2 hover:text-gray-200">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="p-4 max-h-[70vh] overflow-y-auto">
                        {isMovimentacaoCompleta() && <ResumoMovimentacao />}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 p-1">Descrição</label>
                            <input
                                type="text"
                                value={movimentacao.descricao}
                                onChange={(e) => atualizarMovimentacao('descricao', e.target.value)}
                                className="mt-1 block w-full border-2 rounded-md p-2"
                                placeholder="Digite a descrição"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 p-1">Data da Movimentação</label>
                            <input
                                type="date"
                                value={movimentacao.data_movimentacao}
                                onChange={(e) => atualizarMovimentacao('data_movimentacao', e.target.value)}
                                className="mt-1 block w-full border-2 rounded-md p-2"
                            />
                        </div>

                        <SelectedProdutos />

                        <button
                            onClick={() => handleSave(movimentacao)}
                            disabled={loading}
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-athena'} text-white font-bold py-2 my-5 hover:bg-pink-500 rounded-md`}
                        >
                            {loading ? 'Atualizando...' : (isEditing ? 'Atualizar Movimentação' : 'Registrar Movimentação')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMovimentacao;
