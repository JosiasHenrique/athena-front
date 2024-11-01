import { useEffect, useState } from 'react';
import { fetchProdutos } from '../api/apiProduto';

const useSelectProdutos = (adicionarItem) => {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(''); 
    const [valorUnitario, setValorUnitario] = useState(''); 
    const [valorTotal, setValorTotal] = useState(0);
    const [listaVisible, setListaVisible] = useState(false);

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

    useEffect(() => {
        const total = (quantidade > 0 ? quantidade : 0) * (valorUnitario >= 0 ? valorUnitario : 0);
        setValorTotal(parseFloat(total.toFixed(2)));
    }, [quantidade, valorUnitario]);

    const handleSelectProduto = (produto) => {
        setProdutoSelecionado(produto);
        setValorUnitario(produto.preco); 
        setQuantidade(produto.quantidade); 
    };

    const handleAdicionarProduto = () => {

        const produtoComDetalhes = {
            ...produtoSelecionado,
            quantidade: Number(quantidade),
            valor_unitario: Number(valorUnitario),
            valor_total: valorTotal,
        };
        adicionarItem(produtoComDetalhes);
        setProdutoSelecionado(null);
        setListaVisible(false);
        setQuantidade(''); 
        setValorUnitario(''); 
    };

    return {
        produtos,
        produtoSelecionado,
        quantidade,
        valorUnitario,
        valorTotal,
        setQuantidade,
        setValorUnitario,
        handleSelectProduto,
        handleAdicionarProduto,
        listaVisible,
        setListaVisible
    };
};

export default useSelectProdutos;
