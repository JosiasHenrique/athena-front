import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import SelectedRevendedor from './SelectedRevendedor';
import ResumoVenda from './ResumoVenda';
import SelectedCliente from './SelectedCliente';
import SelectedProdutos from './SelectedProdutos';
import { useVenda } from '../../context/VendaContext';
import useVendaForm from '../../hooks/useVendaForm';

const ModalVenda = ({ isOpen, onClose, refreshVendas }) => {
    const { venda, atualizarVenda } = useVenda();
    const { handleSave, loading } = useVendaForm(refreshVendas, onClose);

    const isVendaCompleta = () => {
        return (
            venda.tipo_pagamento ||
            venda.data_venda ||
            venda.id_revendedor ||
            venda.id_cliente 
            
        );
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            Inserir Nova Venda
                        </h2>
                        <button onClick={onClose} className="text-black p-2">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                   
                    {isVendaCompleta() && <ResumoVenda />}
                  
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo de Pagamento</label>
                            <input
                                type="text"
                                value={venda.tipo_pagamento}
                                onChange={(e) => atualizarVenda('tipo_pagamento', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                placeholder="Digite o tipo de pagamento"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data da Venda</label>
                            <input
                                type="date"
                                value={venda.data_venda}
                                onChange={(e) => atualizarVenda('data_venda', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>

                        <SelectedRevendedor />
                        <SelectedCliente />
                        <SelectedProdutos />

                        <button
                            onClick={() => handleSave(venda)}
                            disabled={loading}
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-bold py-2 rounded-md hover:bg-blue-700`}
                        >
                            {loading ? 'Registrando...' : 'Registrar Venda'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalVenda;
