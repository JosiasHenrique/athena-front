import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import ResumoPano from './ResumoPano';
import { usePano } from '../../context/PanoContext';
import usePanoForm from '../../hooks/usePanoForm';
import SelectedProdutos from '../Pano/SelectedProdutos';
import SelectedRevendedor from './SelectedRevendedor';

const ModalPano = ({ isOpen, onClose, refreshPanos, isEditing }) => {
    const { pano, atualizarPano } = usePano();
    const { handleSave, loading } = usePanoForm(refreshPanos, onClose, isEditing);

    const isPanoCompleto = () => {
        return (
            pano.id_revendedor ||
            pano.observacoes ||
            (pano.itens && pano.itens.length > 0)
        );
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-gray-100 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 max-h-[90vh] overflow-hidden">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            {isEditing ? 'Editar Pano' : 'Inserir Novo Pano'}
                        </h2>
                        <button onClick={onClose} className="text-black p-2 hover:text-gray-200">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="p-4 max-h-[70vh] overflow-y-auto">
                        {isPanoCompleto() && <ResumoPano />}
                        <div className="m-5">
                            <label className="block text-sm font-medium text-gray-700">Observações</label>
                            <input
                                type="text"
                                value={pano.observacoes}
                                onChange={(e) => atualizarPano('observacoes', e.target.value)}
                                className="mt-1 block w-full border-2 rounded-md p-2"
                                placeholder="Digite as observações"
                            />
                        </div>
                        <SelectedRevendedor />
                        <SelectedProdutos />
                        <button
                            onClick={() => handleSave(pano)}
                            disabled={loading}
                            className={`w-full ${loading ? 'bg-gray-400' : 'bg-athena'} text-white font-bold py-2 my-5 rounded-md hover:bg-pink-500`}
                        >
                            {loading ? 'Atualizando...' : (isEditing ? 'Atualizar Pano' : 'Registrar Pano')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalPano;
