import React, { createContext, useContext, useState } from 'react';

const MovimentacaoContext = createContext();

export const useMovimentacao = () => {
    return useContext(MovimentacaoContext);
};

export const MovimentacaoProvider = ({ children }) => {
    const [movimentacao, setMovimentacao] = useState({
        id: null,
        data_movimentacao: '',
        descricao: '',
        itens: [] 
    });

    const atualizarMovimentacao = (key, value) => {
        setMovimentacao(prev => ({ ...prev, [key]: value }));
    };

    const adicionarItem = (item) => {
        setMovimentacao(prev => ({ ...prev, itens: [...prev.itens, item] }));
    };

    const resetMovimentacao = () => {
        setMovimentacao({
            id: null,
            data_movimentacao: '',
            descricao: '',
            itens: [],
        });
    };

    const removerItem = (itemId) => {
        setMovimentacao(prev => ({ 
            ...prev, 
            itens: prev.itens.filter(item => item.id !== itemId) 
        }));
    };

    return (
        <MovimentacaoContext.Provider value={{
            movimentacao,
            atualizarMovimentacao,
            adicionarItem,
            resetMovimentacao,
            removerItem
        }}>
            {children} 
        </MovimentacaoContext.Provider>
    );
};
