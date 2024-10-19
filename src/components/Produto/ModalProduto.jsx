import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

const ModalProduto = ({ isOpen, onClose, produto, isEditing, onSave, loading }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [estoqueAtual, setEstoqueAtual] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNome('');
            setDescricao('');
            setCategoria('');
            setTamanho('');
            setEstoqueAtual('');

            if (isEditing && produto) {
                setNome(produto.nome);
                setDescricao(produto.descricao);
                setCategoria(produto.categoria);
                setTamanho(produto.tamanho);
                setEstoqueAtual(produto.estoque_atual);
            }
        }
    }, [produto, isEditing, isOpen]);

    const handleSave = () => {
        onSave(nome, descricao, categoria, tamanho, estoqueAtual);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold  text-black p-2">
                            Cadastro/Edição Produto
                        </h2>
                        <button onClick={onClose} className="text-black p-2 hover:text-gray-200">
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
                        <label className="block text-gray-700">Descrição</label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="mt-1 p-1 block w-full rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Categoria</label>
                        <input
                            type="text"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                            className="mt-1 p-1 block w-full rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="flex mb-4 space-x-2">
                        <div className="flex-1">
                            <label className="block text-gray-700">Tamanho</label>
                            <input
                                type="text"
                                value={tamanho}
                                onChange={(e) => setTamanho(e.target.value)}
                                className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">Estoque Atual</label>
                            <input
                                type="number"
                                value={estoqueAtual}
                                onChange={(e) => setEstoqueAtual(e.target.value)}
                                className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSave} className={`w-full text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? 'Salvando...' : 'Salvar Produto'}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduto;
