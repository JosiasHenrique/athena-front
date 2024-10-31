import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ModalCliente = ({ isOpen, onClose, cliente, isEditing, onSave, loading }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (isOpen) {
            reset({
                nome: isEditing && cliente ? cliente.nome : '',
                telefone: isEditing && cliente ? cliente.telefone : '',
                email: isEditing && cliente ? cliente.email : ''
            });
        }
    }, [cliente, isEditing, isOpen, reset]);

    const onSubmit = (data) => {
        onSave(data.nome, data.telefone, data.email);
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
                <div className="bg-white rounded-lg w-11/12 md:w-1/3">
                    <div className="flex justify-between items-center mb-4 cabecalho-modal">
                        <h2 className="text-lg font-semibold text-black p-2">
                            Cadastro/Edição Cliente
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
                                <label className="block text-gray-700">Telefone</label>
                                <input
                                    type="text"
                                    {...register("telefone", { required: "Telefone é obrigatório" })}
                                    className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.telefone && <span className="text-red-500">{errors.telefone.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email é obrigatório",
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: "Email inválido"
                                        }
                                    })}
                                    className="mt-1 p-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className={`w-full text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Salvando...' : 'Salvar Cliente'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCliente;
