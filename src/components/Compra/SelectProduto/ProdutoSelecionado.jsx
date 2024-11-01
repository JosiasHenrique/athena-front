import React from 'react';
import { useForm } from 'react-hook-form';

const ProdutoSelecionado = ({ produto, quantidade, valorUnitario, valorTotal, onQuantidadeChange, onValorUnitarioChange, onAdicionar }) => {
    const { register, formState: { errors }, setValue, trigger, reset, watch } = useForm();

    if (!produto) return null;

    const handleInputChange = (e, field, onChange) => {
        const value = Number(e.target.value);
        onChange(e);
        setValue(field, value); 
        trigger(field); 
    };

    const handleAdicionar = async () => {
        const isValid = await trigger();
        if (isValid) {
            onAdicionar();
            reset({ quantidade: '', valorUnitario: '' }); 
        }
    };

    watch(["quantidade", "valorUnitario"]);

    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Produto Selecionado</h2>
            <div className="mb-2">
                <label className="block text-sm">Produto:</label>
                <input type="text" value={produto.nome || ''} className="w-full p-2 border-2 rounded-md" disabled />
            </div>
            <div className="mb-2">
                <label className="block text-sm">Quantidade:</label>
                <input
                    type="number"
                    value={quantidade}
                    {...register("quantidade", { required: "A quantidade é obrigatória.", min: { value: 1, message: "A quantidade deve ser pelo menos 1." } })}
                    onChange={(e) => handleInputChange(e, "quantidade", onQuantidadeChange)}
                    className="w-full p-2 border-2 rounded-md"
                />
                {errors.quantidade && <p className="text-red-500">{errors.quantidade.message}</p>}
            </div>
            <div className="mb-2">
                <label className="block text-sm">Valor Unitário R$:</label>
                <input
                    type="number"
                    value={valorUnitario}
                    {...register("valorUnitario", { required: "O valor unitário é obrigatório.", min: { value: 0, message: "O valor unitário não pode ser menor que 0." } })}
                    onChange={(e) => handleInputChange(e, "valorUnitario", onValorUnitarioChange)}
                    className="w-full p-2 border-2 rounded-md"
                />
                {errors.valorUnitario && <p className="text-red-500">{errors.valorUnitario.message}</p>}
            </div>
            <div className="mb-2">
                <label className="block text-sm">Valor Total R$:</label>
                <input type="number" value={valorTotal.toFixed(2)} className="w-full p-2 border-2 rounded-md" disabled />
            </div>
            <button onClick={handleAdicionar} className="w-full text-white rounded-md p-2 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena">
                Adicionar Produto
            </button>
        </div>
    );
};

export default ProdutoSelecionado;
