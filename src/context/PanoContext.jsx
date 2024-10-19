import React, { createContext, useContext, useState } from 'react';

const PanoContext = createContext();

export const usePano = () => {
    return useContext(PanoContext);
};

export const PanoProvider = ({ children }) => {
    const [pano, setPano] = useState({
        id: null,
        id_revendedor: null,
        observacoes: '',
        itens: []  
    });

    const [revendedor, setRevendedor] = useState(null);

    const definirRevendedor = (rev) => {
        setRevendedor(rev);
        atualizarPano('id_revendedor', rev.id); 
    };

    const atualizarPano = (key, value) => {
        setPano(prev => ({ ...prev, [key]: value }));
    };

    const adicionarItem = (item) => {
        setPano(prev => ({ ...prev, itens: [...prev.itens, item] }));
    };

    const resetPano = () => {
        setPano({
            id: null,
            id_revendedor: null,
            observacoes: '',
            itens: [],
        }),
        setRevendedor(null);
    };

    const removerItem = (itemId) => {
        setPano(prev => ({
            ...prev,
            itens: prev.itens.filter(item => item.id !== itemId)
        }));
    };

    return (
        <PanoContext.Provider value={{
            pano,
            revendedor,
            atualizarPano,
            adicionarItem,
            definirRevendedor,
            resetPano,
            removerItem
        }}>
            {children}
        </PanoContext.Provider>
    );
};
