import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ModalRevendedor = ({ isOpen, onClose, revendedor, isEditing, onSave, loading }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (isOpen) {
            reset({
                nome: isEditing && revendedor ? revendedor.nome : '',
                contato: isEditing && revendedor ? revendedor.contato : '',
                comissao: isEditing && revendedor ? revendedor.comissao : ''
            });
        }
    }, [revendedor, isEditing, isOpen, reset]);

    const onSubmit = (data) => {
        onSave(data.nome, data.contato, data.comissao);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/3">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            Cadastro/Edição Revendedor
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
                                <label className="block text-gray-700">Contato</label>
                                <input
                                    type="text"
                                    {...register("contato", { required: "Contato é obrigatório" })}
                                    className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.contato && <span className="text-red-500">{errors.contato.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Comissão (%)</label>
                                <input
                                    type="number"
                                    {...register("comissao", {
                                        required: "Comissão é obrigatória",
                                        min: { value: 0, message: "Comissão não pode ser menor que 0" },
                                        max: { value: 100, message: "Comissão não pode ser maior que 100" }
                                    })}
                                    className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.comissao && <span className="text-red-500">{errors.comissao.message}</span>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className={`w-full text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Salvando...' : 'Salvar Revendedor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRevendedor;
