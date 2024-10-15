import React, { createContext, useContext, useState } from 'react';

const VendaContext = createContext();

export const useVenda = () => {
    return useContext(VendaContext);
};

export const VendaProvider = ({ children }) => {
    const [venda, setVenda] = useState({
        id: null,
        tipo_pagamento: '', 
        data_venda: '',
        id_revendedor: null, 
        id_cliente: null, 
        produtos: [] 
    });

    const [revendedor, setRevendedor] = useState(null);
    const [cliente, setCliente] = useState(null); 

    const atualizarVenda = (key, value) => {
        setVenda(prev => ({ ...prev, [key]: value }));
    };

    const adicionarProduto = (produto) => {
        setVenda(prev => ({ ...prev, produtos: [...prev.produtos, produto] }));
    };

    const definirRevendedor = (rev) => {
        setRevendedor(rev);
        atualizarVenda('id_revendedor', rev.id); 
    };

    const definirCliente = (cli) => {
        setCliente(cli); 
        atualizarVenda('id_cliente', cli.id); 
    };

    const removerProduto = (produtoId) => {
        setVenda(prev => ({
            ...prev,
            produtos: prev.produtos.filter(produto => produto.id !== produtoId)
        }));
    };
    

    const resetVenda = () => {
        setVenda({
            id: null,
            tipo_pagamento: '',
            data_venda: '',
            id_revendedor: null,
            id_cliente: null,
            produtos: [],
        }),
        setCliente(null),
        setRevendedor(null);
    };

    return (
        <VendaContext.Provider value={{
            venda,
            atualizarVenda,
            adicionarProduto,
            revendedor, 
            cliente,
            definirRevendedor,
            definirCliente,
            removerProduto,
            resetVenda
        }}>
            {children} 
        </VendaContext.Provider>
    );
};
