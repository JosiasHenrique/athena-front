import React from 'react';

const BuscarProduto = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full p-2 border-2 rounded-md"
            />
        </div>
    );
};
export default BuscarProduto;
