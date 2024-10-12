import React, { createContext, useContext, useState } from 'react';

const VendaContext = createContext();

export const useVenda = () => {
    return useContext(VendaContext);
};

export const VendaProvider = ({ children }) => {
    const [venda, setVenda] = useState({
        tipo_pagamento: '', 
        data_venda: '',
        id_revendedor: null, 
        id_cliente: null, 
        produtos: [] 
    });

    const [revendedor, setRevendedor] = useState(null);
    const [cliente, setCliente] = useState(null); 

    // Função para atualizar a venda com uma nova chave e valor
    const atualizarVenda = (key, value) => {
        setVenda(prev => ({ ...prev, [key]: value }));
    };

    // Função para adicionar um produto à lista de produtos da venda
    const adicionarProduto = (produto) => {
        setVenda(prev => ({ ...prev, produtos: [...prev.produtos, produto] }));
    };

    // Função para definir o revendedor selecionado
    const definirRevendedor = (rev) => {
        setRevendedor(rev); // Atualiza o revendedor selecionado
        atualizarVenda('id_revendedor', rev.id); // Atualiza o ID do revendedor na venda
    };

    const definirCliente = (rev) => {
        setCliente(rev); 
        atualizarVenda('id_cliente', rev.id); 
    };

    return (
        <VendaContext.Provider value={{
            venda,
            atualizarVenda,
            adicionarProduto,
            revendedor, 
            cliente,
            definirRevendedor,
            definirCliente
        }}>
            {children} 
        </VendaContext.Provider>
    );
};
