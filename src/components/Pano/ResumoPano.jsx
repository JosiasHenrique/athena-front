import React from 'react';
import { usePano } from '../../context/PanoContext';

const ResumoPano = () => {
    const { pano, removerItem, revendedor } = usePano();

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md mt-4">
            <h2 className="text-2xl font-bold mb-4">Resumo do Pano</h2>
            <div className="mb-2">
                <span className="font-semibold">Revendedor:</span> {revendedor ? revendedor.nome : ''}
            </div>
            <div className="mb-2">
                <span className="font-semibold">Observações:</span> {pano.observacoes || 'Nenhuma'}
            </div>
            {pano && pano.itens && pano.itens.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-2">Itens Selecionados</h2>
                    {pano.itens.map((item, index) => (
                        <div key={index} className="mb-2 p-2 bg-gray-100 rounded-lg border">
                            <div className="mb-2">
                                <span className="font-semibold">Nome:</span> {item.nome}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Quantidade:</span> {item.quantidade}
                            </div>
                            <div className="mb-2">
                                <span className="font-semibold">Valor de venda:</span> R$ {item.valor_venda.toFixed(2)}
                            </div>
                            <button 
                                onClick={() => { removerItem(item.id) }}
                                className="w-full text-white rounded-md p-2 transition duration-200 ease-in-out bg-red-500 hover:bg-red-600"
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

export default ResumoPano;
