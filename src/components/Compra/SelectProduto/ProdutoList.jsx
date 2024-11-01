import React from 'react';

const ProdutoList = ({ produtos, onSelectProduto }) => {
    return (
        <div className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-lg font-bold mb-2">Produtos Disponíveis</h2>
            <div className="space-y-2">
                {produtos.length > 0 ? (
                    produtos.map((produto) => (
                        <button
                            key={produto.id}
                            onClick={() => onSelectProduto(produto)}
                            className="w-full flex justify-between items-center p-2 bg-white text-gray-800 rounded-md border border-gray-200 hover:bg-pink-100 transition duration-200 ease-in-out"
                        >
                            <span>{produto.nome}</span>
                            <span className="text-sm">{produto.categoria}</span>
                        </button>
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default ProdutoList;
