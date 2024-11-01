import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePano } from '../../context/PanoContext'; 
import { fetchProdutos } from '../../api/apiProduto';

const SelectedProdutos = () => {
    const { adicionarItem } = usePano();
    const { register, setValue, trigger, reset, watch, formState: { errors } } = useForm();
    const [produtos, setProdutos] = useState([]);
    const [listaVisible, setListaVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const loadProdutos = async () => {
        const produtosApi = await fetchProdutos();
        setProdutos(produtosApi);
    };

    useEffect(() => {
        loadProdutos();
    }, []);

    useEffect(() => {
        if (produtoSelecionado) {
            setValue('quantidade', '');
            setValue('valorVenda', ''); 
        }
    }, [produtoSelecionado, setValue]);

    watch(["quantidade", "valorVenda"]);

    const handleAdicionarProduto = async () => {
        const isValid = await trigger();
        if (!isValid) {
            return;
        }

        const quantidade = watch("quantidade");
        const valorVenda = watch("valorVenda");

        const produtoComDetalhes = {
            ...produtoSelecionado,
            quantidade,
            valor_venda: valorVenda,
        };

        adicionarItem(produtoComDetalhes);
        reset();
        setProdutoSelecionado(null);
        setListaVisible(false);
    };

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
                                    onClick={() => setProdutoSelecionado(produto)}
                                    className="w-full flex justify-between items-center p-2 bg-white text-gray-800 rounded-md border border-gray-200 hover:bg-pink-100 transition duration-200 ease-in-out"
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

                    <div className="mb-2">
                        <label className="block text-sm">Produto:</label>
                        <input
                            type="text"
                            value={produtoSelecionado.nome || ''}
                            className="w-full p-2 border-2 rounded-md"
                            disabled
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Quantidade:</label>
                        <input
                            type="number"
                            {...register("quantidade", { required: "A quantidade é obrigatória.", min: { value: 1, message: "A quantidade deve ser pelo menos 1." } })}
                            onChange={(e) => {
                                setValue('quantidade', e.target.value);
                                trigger("quantidade");
                            }}
                            className="w-full p-2 border-2 rounded-md"
                        />
                        {errors.quantidade && <p className="text-red-500">{errors.quantidade.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Valor de Venda:</label>
                        <input
                            type="number"
                            {...register("valorVenda", { required: "O valor de venda é obrigatório.", min: { value: 0, message: "O valor de venda não pode ser menor que 0." } })}
                            onChange={(e) => {
                                setValue('valorVenda', e.target.value);
                                trigger("valorVenda");
                            }}
                            className="w-full p-2 border-2 rounded-md"
                        />
                        {errors.valorVenda && <p className="text-red-500">{errors.valorVenda.message}</p>}
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
