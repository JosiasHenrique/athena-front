import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ModalProduto = ({ isOpen, onClose, produto, isEditing, onSave, loading }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (isOpen) {
            reset({
                nome: isEditing && produto ? produto.nome : '',
                descricao: isEditing && produto ? produto.descricao : '',
                categoria: isEditing && produto ? produto.categoria : '',
                tamanho: isEditing && produto ? produto.tamanho : '',
                estoqueAtual: isEditing && produto ? produto.estoque_atual : ''
            });
        }
    }, [produto, isEditing, isOpen, reset]);

    const onSubmit = (data) => {
        onSave(data.nome, data.descricao, data.categoria, data.tamanho, data.estoqueAtual);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            Cadastro/Edição Produto
                        </h2>
                        <button onClick={onClose} className="text-black p-2 hover:text-gray-200">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="content-modal">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nome</label>
                                <input
                                    type="text"
                                    {...register("nome", { required: "Nome é obrigatório" })}
                                    className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Descrição</label>
                                <textarea
                                    {...register("descricao", { required: "Descrição é obrigatória" })}
                                    className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.descricao && <span className="text-red-500">{errors.descricao.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Categoria</label>
                                <input
                                    type="text"
                                    {...register("categoria", { required: "Categoria é obrigatória" })}
                                    className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.categoria && <span className="text-red-500">{errors.categoria.message}</span>}
                            </div>
                            <div className="flex mb-4 space-x-2">
                                <div className="flex-1">
                                    <label className="block text-gray-700">Tamanho</label>
                                    <input
                                        type="text"
                                        {...register("tamanho", { required: "Tamanho é obrigatório" })}
                                        className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                    />
                                    {errors.tamanho && <span className="text-red-500">{errors.tamanho.message}</span>}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-gray-700">Estoque Atual</label>
                                    <input
                                        type="number"
                                        {...register("estoqueAtual", {
                                            required: "Estoque Atual é obrigatório",
                                            min: { value: 0, message: "Estoque não pode ser menor que 0" }
                                        })}
                                        className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                        disabled={isEditing? true : false}
                                    />
                                    {errors.estoqueAtual && <span className="text-red-500">{errors.estoqueAtual.message}</span>}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className={`w-full text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Salvando...' : 'Salvar Produto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduto;
