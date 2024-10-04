// Modal.jsx
import React from 'react';

const ModalDelete = ({ isOpen, onClose, onConfirm, item }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">Tem certeza?</h2>
                <p>Você deseja excluir este {item}?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Sair
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;