import React, { useState } from 'react';
import { useCompra } from '../../../context/CompraContext';
import ProdutoList from './ProdutoList';
import ProdutoSelecionado from './ProdutoSelecionado';
import BuscarProduto from './BuscarProduto';
import useSelectProdutos from '../../../hooks/useSelectProdutos'; 

const SelectedProdutos = () => {
    const { adicionarItem } = useCompra(); 
    const [searchTerm, setSearchTerm] = useState('');
    
    const {
        produtos, produtoSelecionado, quantidade, valorUnitario, valorTotal, setQuantidade,
        setValorUnitario, handleSelectProduto, handleAdicionarProduto, listaVisible, setListaVisible,
    } = useSelectProdutos(adicionarItem);

    const filteredProdutos = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 my-2 bg-white rounded-lg shadow-md">
            <button
                onClick={() => setListaVisible(!listaVisible)}
                className={`w-full rounded-md p-2 mb-4 transition duration-200 ease-in-out 
                    ${produtoSelecionado ? 'bg-green-500 text-white' : 'bg-athena text-white hover:bg-pink-500'}`}
            >
                {produtoSelecionado ? 'Produto Selecionado' : 'Selecionar Produto'}
            </button>

            {listaVisible && (
                <BuscarProduto
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                />
            )}
            {listaVisible && (
                <ProdutoList
                    produtos={filteredProdutos}
                    onSelectProduto={handleSelectProduto}
                />
            )}

            <ProdutoSelecionado
                produto={produtoSelecionado}
                quantidade={quantidade}
                valorUnitario={valorUnitario}
                valorTotal={valorTotal}
                onQuantidadeChange={(e) => setQuantidade(Number(e.target.value))}
                onValorUnitarioChange={(e) => setValorUnitario(Number(e.target.value))}
                onAdicionar={handleAdicionarProduto}
            />
        </div>
    );
};

export default SelectedProdutos;
