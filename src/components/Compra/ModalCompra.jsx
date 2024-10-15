import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import ResumoCompra from './ResumoCompra';
import { useCompra } from '../../context/CompraContext';
import useCompraForm from '../../hooks/useCompraForm';
import SelectedProdutos from '../Compra/SelectedProdutos';

const ModalCompra = ({ isOpen, onClose, refreshCompras, isEditing }) => {
    const { compra, atualizarCompra } = useCompra();
    const { handleSave, loading } = useCompraForm(refreshCompras, onClose, isEditing);

    const isCompraCompleta = () => {
        return (
            compra.numero_nota || 
            compra.fornecedor || 
            compra.data_compra || 
            (compra.itens && compra.itens.length > 0)
        );
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            {isEditing ? 'Editar Compra' : 'Inserir Nova Compra'}
                        </h2>
                        <button onClick={onClose} className="text-black p-2">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {isCompraCompleta() && <ResumoCompra />}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número da Nota</label>
                            <input
                                type="text"
                                value={compra.numero_nota}
                                onChange={(e) => atualizarCompra('numero_nota', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                placeholder="Digite o número da nota"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fornecedor</label>
                            <input
                                type="text"
                                value={compra.fornecedor}
                                onChange={(e) => atualizarCompra('fornecedor', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                placeholder="Digite o fornecedor"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data da Compra</label>
                            <input
                                type="date"
                                value={compra.data_compra}
                                onChange={(e) => atualizarCompra('data_compra', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <SelectedProdutos />

                        <button
                            onClick={() => handleSave(compra)}
                            disabled={loading}
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-bold py-2 rounded-md hover:bg-blue-700`}
                        >
                             {loading ? 'Atualizando...' : (isEditing ? 'Atualizar Compra' : 'Registrar Compra')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCompra;
