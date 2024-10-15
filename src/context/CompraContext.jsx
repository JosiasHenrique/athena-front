import React, { createContext, useContext, useState } from 'react';

const CompraContext = createContext();

export const useCompra = () => {
    return useContext(CompraContext);
};

export const CompraProvider = ({ children }) => {
    const [compra, setCompra] = useState({
        id: null,
        numero_nota: '',
        fornecedor: '',
        data_compra: '',
        itens: [] 
    });

    const atualizarCompra = (key, value) => {
        setCompra(prev => ({ ...prev, [key]: value }));
    };

    const adicionarItem = (item) => {
        setCompra(prev => ({ ...prev, itens: [...prev.itens, item] }));
    };

    const resetCompra = () => {
        setCompra({
            id: null,
            numero_nota: '',
            fornecedor: '',
            data_compra: '',
            itens: [],
        });

    };

    const removerItem = (itemId) => {
        setCompra(prev => ({ 
            ...prev, 
            itens: prev.itens.filter(item => item.id !== itemId) 
        }));
    };

    return (
        <CompraContext.Provider value={{
            compra,
            atualizarCompra,
            adicionarItem,
            resetCompra,
            removerItem
        }}>
            {children} 
        </CompraContext.Provider>
    );
};
