import React, { useEffect, useState } from 'react';

const ModalCliente = ({ isOpen, onClose, cliente, isEditing, onSave, loading }) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNome('');
            setTelefone('');
            setEmail('');

            if (isEditing && cliente) {
                setNome(cliente.nome);
                setTelefone(cliente.telefone);
                setEmail(cliente.email);
            }
        }
    }, [cliente, isEditing, isOpen]);

    const handleSave = () => {
        onSave(nome, telefone, email); 
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold bg-pink-500 text-white p-2 rounded">
                            Cadastro/Edição Cliente
                        </h2>
                        <button onClick={onClose} className="bg-pink-500 text-white rounded-full p-2">
                            &times;
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
                        <label className="block text-gray-700">Telefone</label>
                        <input 
                            type="text" 
                            value={telefone} 
                            onChange={(e) => setTelefone(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
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

export default ModalCliente;
