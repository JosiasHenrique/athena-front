import React from 'react';
import { useVenda } from '../../context/VendaContext';

const ResumoVenda = () => {
    const { venda, revendedor, cliente } = useVenda();

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
                <span className="font-semibold">Revendedor:</span> {cliente ? cliente.nome : ''}
            </div>
        </div>
    );
};

export default ResumoVenda;
