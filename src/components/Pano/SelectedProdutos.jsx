import React, { useEffect, useState } from 'react';
import { usePano } from '../../context/PanoContext';
import { fetchProdutos } from '../../api/apiProduto';

const SelectedProdutos = () => {
    const { adicionarItem } = usePano(); 
    const [produtos, setProdutos] = useState([]);
    const [listaVisible, setListaVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1); 
    const [valorVenda, setValorVenda] = useState(0); 

    const loadProdutos = async () => {
        try {
            const produtosApi = await fetchProdutos();
            setProdutos(produtosApi);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    useEffect(() => {
        loadProdutos();
    }, []);

    const handleSelectProduto = (produto) => {
        setProdutoSelecionado(produto);
        setQuantidade(1);
        setValorVenda(produto.valorVenda);
    };

    const handleAdicionarProduto = () => {
        const produtoComDetalhes = {
            ...produtoSelecionado,
            quantidade: quantidade,
            valor_venda: valorVenda,
        };
        adicionarItem(produtoComDetalhes);
        setProdutoSelecionado(null);
        setListaVisible(false);
    };

    const filteredProdutos = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleQuantidadeChange = (e) => {
        const value = Number(e.target.value);
        setQuantidade(isNaN(value) || value <= 0 ? 1 : value);
    };

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
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-2 rounded-md"
                    />
                </div>
            )}

            {listaVisible && (
                <div className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-300">
                    <h2 className="text-lg font-bold mb-2">Produtos Disponíveis</h2>
                    <div className="space-y-2">
                        {filteredProdutos.length > 0 ? (
                            filteredProdutos.map((produto) => (
                                <button
                                    key={produto.id}
                                    onClick={() => handleSelectProduto(produto)}
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
            )}

            {produtoSelecionado && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-2">Produto Selecionado</h2>

                    <div className="mb-2">
                        <label className="block text-sm">Produto:</label>
                        <input
                            type="text"
                            value={produtoSelecionado.nome || ''} 
                            className="w-full p-2 border-2  rounded-md"
                            disabled
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Quantidade:</label>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={handleQuantidadeChange} 
                            className="w-full p-2 border-2 rounded-md"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm">Valor de venda:</label>
                        <input
                            type="number"
                            value={valorVenda} 
                            onChange={(e) => setValorVenda(Number(e.target.value))}
                            className="w-full p-2 border-2 rounded-md"
                        />
                    </div>

                    <button
                        onClick={handleAdicionarProduto}
                        className="w-full bg-athena text-white rounded-md p-2 hover:bg-pink-500 transition duration-200 ease-in-out"
                    >
                        Adicionar Produto
                    </button>
                </div>
            )}
        </div>
    );
};

export default SelectedProdutos;
