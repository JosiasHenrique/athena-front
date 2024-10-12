import { XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import SelectedRevendedor from './SelectedRevendedor';
import ResumoVenda from './ResumoVenda';
import SelectedCliente from './SelectedCliente';

const ModalVenda = ({ isOpen, onClose }) => {

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            Inserir Nova Venda
                        </h2>
                        <button onClick={onClose} className="text-black p-2">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <ResumoVenda />
                    <SelectedRevendedor />
                    <SelectedCliente />
                </div>
            </div>
        </div>
    );
};

export default ModalVenda;
