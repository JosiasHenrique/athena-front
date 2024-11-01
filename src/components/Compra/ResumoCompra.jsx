import React from 'react';
import { useCompra } from '../../context/CompraContext';

const ResumoCompra = () => {
    const { compra, removerItem } = useCompra();

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Resumo da Compra</h2>
            <div className="mb-2">
                <span className="font-semibold">Número da Nota:</span> {compra.numero_nota}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fornecedor:</span> {compra.fornecedor}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Data da Compra:</span> {new Date(compra.data_compra).toLocaleDateString('pt-BR')}
            </div>
            {compra && compra.itens && compra.itens.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-2">Itens Selecionados</h2>
                    {compra.itens.map((item, index) => {
                        const valorUnitario = parseFloat(item.valor_unitario) || 0;
                        const valorTotal = parseFloat(item.valor_total) || 0;
                        return (
                            <div key={index} className="mb-2 p-2 bg-gray-100 rounded-lg border">
                                <div className="mb-2">
                                    <span className="font-semibold">Nome:</span> {item.nome}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Quantidade:</span> {item.quantidade}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Valor Unitário:</span> R$ {valorUnitario.toFixed(2)}
                                </div>
                                <div className="mb-2">
                                    <span className="font-semibold">Valor total:</span> R$ {valorTotal.toFixed(2)}
                                </div>
                                <button 
                                    onClick={() => {removerItem(item.id)}}
                                    className="w-full text-white rounded-md p-2 transition duration-200 ease-in-out bg-red-500 hover:bg-red-600"
                                >
                                    Remover
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ResumoCompra;
