import React from 'react';
import { useVenda } from '../../context/VendaContext';

const ResumoVenda = () => {
    const { venda, revendedor, cliente, removerProduto } = useVenda();

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">

            <h2 className="text-2xl font-bold mb-4">Resumo da Venda</h2>
            <div className="mb-2">
                <span className="font-semibold">Tipo de Pagamento:</span> {venda.tipo_pagamento}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Data da Venda:</span> {venda.data_venda}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Revendedor:</span> {revendedor ? revendedor.nome : ''}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Comissão do Revendedor:</span> {revendedor ? `${revendedor.comissao}%` : ''}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Cliente:</span> {cliente ? cliente.nome : ''}
            </div>
            {venda && venda.produtos && venda.produtos.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-2">Produtos Selecionados</h2>
                    {venda.produtos.map((produto, index) => (
                        <div key={index} className="mb-2 p-2 bg-gray-100 rounded-lg border">
                            <div className="mb-2">
                                <span className="font-semibold">Produto:</span> {produto.nome}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Quantidade:</span> {produto.quantidade}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Valor Unitário:</span> R$ {produto.valor_unitario.toFixed(2)}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Valor Total:</span> R$ {produto.valor_total.toFixed(2)}
                            </div>
                            <button 
                                onClick={() => {removerProduto(produto.id)}}
                            >
                                Remover
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResumoVenda;
