import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

const ModalVenda = ({ isOpen, onClose, venda, isEditing, onSave, loading }) => {
    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [comissao, setComissao] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNome('');
            setContato('');
            setComissao('');

            if (isEditing && venda) {
                setNome(venda.nome);
                setContato(venda.contato);
                setComissao(venda.comissao);
            }
        }
    }, [venda, isEditing, isOpen]);

    const handleSave = () => {
        onSave(nome, contato, comissao);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold bg-pink-500 text-white p-2 rounded">
                            Cadastro/Edição Venda
                        </h2>
                        <button onClick={onClose} className="bg-pink-500 text-white rounded-full p-2">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contato</label>
                        <input
                            type="text"
                            value={contato}
                            onChange={(e) => setContato(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Comissão</label>
                        <input
                            type="text"
                            value={comissao}
                            onChange={(e) => setComissao(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleSave} className={`bg-pink-500 text-white rounded px-4 py-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalVenda;
