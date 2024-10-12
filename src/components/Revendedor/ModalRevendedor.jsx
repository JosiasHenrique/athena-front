import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

const ModalRevendedor = ({ isOpen, onClose, revendedor, isEditing, onSave, loading }) => {
    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [comissao, setComissao] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNome('');
            setContato('');
            setComissao('');

            if (isEditing && revendedor) {
                setNome(revendedor.nome);
                setContato(revendedor.contato);
                setComissao(revendedor.comissao);
            }
        }
    }, [revendedor, isEditing, isOpen]);

    const handleSave = () => {
        onSave(nome, contato, comissao);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/3">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold  text-black p-2">
                            Cadastro/Edição Revendedor
                        </h2>
                        <button onClick={onClose} className="text-black p-2">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="content-modal">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-1 p-1 block w-full rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contato</label>
                        <input
                            type="text"
                            value={contato}
                            onChange={(e) => setContato(e.target.value)}
                            className="mt-1 p-1 block w-full rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Comissão</label>
                        <input
                            type="text"
                            value={comissao}
                            onChange={(e) => setComissao(e.target.value)}
                            className="mt-1 p-1 block w-full rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleSave} className={`bg-athena text-black rounded px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRevendedor;
