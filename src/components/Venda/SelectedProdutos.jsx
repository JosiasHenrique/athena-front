import React, { useEffect, useState } from 'react';
import { useVenda } from '../../context/VendaContext';
import { fetchProdutos } from '../../api/apiProduto';

const SelectedProdutos = () => {
    const { adicionarProduto, revendedor } = useVenda(); 
    const [produtos, setProdutos] = useState([]);
    const [listaVisible, setListaVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [valorUnitario, setValorUnitario] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [comissao, setComissao] = useState(0);
    const [mensagemErro, setMensagemErro] = useState('');

    const loadProdutos = async () => {
        const produtosApi = await fetchProdutos();
        setProdutos(produtosApi);
    };

    useEffect(() => {
        loadProdutos();
    }, []);

    useEffect(() => {
        const total = quantidade * valorUnitario;
        setValorTotal(parseFloat(total.toFixed(2)));

        if (revendedor && revendedor.comissao) {
            const comissaoCalculada = (total * revendedor.comissao) / 100;
            setComissao(parseFloat(comissaoCalculada.toFixed(2)));
            setMensagemErro('');
        } else {
            setComissao(0);
            setMensagemErro('Por favor, selecione um revendedor para calcular a comissão.');
        }
    }, [quantidade, valorUnitario, revendedor]);

    const handleSelectProduto = (produto) => {
        setProdutoSelecionado(produto);
        setValorUnitario(produto.preco || 0); // Garante que o valor unitário não seja undefined
        setQuantidade(1);
    };

    const handleAdicionarProduto = () => {
        if (!revendedor) {
            setMensagemErro('Você precisa selecionar um revendedor antes de adicionar um produto.');
            return; 
        }

        const produtoComDetalhes = {
            ...produtoSelecionado,
            quantidade: quantidade,
            valor_unitario: valorUnitario,
            valor_total: valorTotal,
            valor_comissao: comissao
        };
        adicionarProduto(produtoComDetalhes);
        setProdutoSelecionado(null);
        setListaVisible(false);
    };

    const filteredProdutos = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <button
                onClick={() => setListaVisible(!listaVisible)}
                className="w-full bg-blue-500 text-white rounded-md p-2 mb-4 hover:bg-blue-600 transition duration-200 ease-in-out"
            >
                Selecionar Produto
            </button>

            {listaVisible && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar produto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
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
                                    className="w-full flex justify-between items-center p-2 bg-white text-gray-800 rounded-md border border-gray-200 hover:bg-blue-100 transition duration-200 ease-in-out"
                                >
                                    <span>{produto.nome}</span>
                                    <span className="text-sm">{produto.preco}</span>
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
                    {mensagemErro && <p className="text-red-500">{mensagemErro}</p>} {/* Exibe a mensagem de erro */}

                    <div className="mb-2">
                        <label className="block text-sm">Produto:</label>
                        <input
                            type="text"
                            value={produtoSelecionado.nome || ''} // Garante que não seja undefined
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Quantidade:</label>
                        <input
                            type="number"
                            value={quantidade}
                            min="1"
                            onChange={(e) => setQuantidade(Number(e.target.value) || 1)} // Garante que o valor mínimo seja 1
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Valor Unitário:</label>
                        <input
                            type="number"
                            value={valorUnitario || 0} // Garante que não seja undefined
                            onChange={(e) => setValorUnitario(Number(e.target.value) || 0)} // Garante que não seja undefined
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Valor Total:</label>
                        <input
                            type="number"
                            value={valorTotal || 0} // Garante que não seja undefined
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Comissão do Revendedor:</label>
                        <input
                            type="number"
                            value={comissao || 0} // Garante que não seja undefined
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled
                        />
                    </div>
                    <button
                        onClick={handleAdicionarProduto}
                        className="w-full bg-green-500 text-white rounded-md p-2 hover:bg-green-600 transition duration-200 ease-in-out"
                    >
                        Adicionar Produto
                    </button>
                </div>
            )}
        </div>
    );
};

export default SelectedProdutos;
