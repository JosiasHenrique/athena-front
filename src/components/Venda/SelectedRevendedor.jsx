import React, { useEffect, useState } from 'react';
import { useVenda } from '../../context/VendaContext';
import { fetchRevendedores } from '../../api/apiRevendedor';

const SelectedRevendedor = () => {
    const { definirRevendedor, revendedor } = useVenda();
    const [vendedores, setRevendedores] = useState([]);
    const [listaVisible, setListaVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 

    const loadRevendedores = async () => {
        const revendedoresApi = await fetchRevendedores();
        setRevendedores(revendedoresApi);
    };

    useEffect(() => {
        loadRevendedores();
    }, []);

    const handleSelectRevendedor = (rev) => {
        definirRevendedor(rev); 
        setListaVisible(false);
    };

    const filteredRevendedores = vendedores.filter((rev) =>
        rev.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 my-2 bg-white rounded-lg shadow-md">
            <button 
                onClick={() => setListaVisible(!listaVisible)} 
                className={`w-full rounded-md p-2 mb-4 transition duration-200 ease-in-out 
                    ${revendedor ? 'bg-green-500 text-white' : 'bg-athena text-white hover:bg-pink-500'}`}
            >
                {revendedor ? 'Revendedor Selecionado' : 'Selecionar Revendedor'}
            </button>
            {listaVisible && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar revendedor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border-2 rounded-md"
                    />
                </div>
            )}
            
            {listaVisible && (
                <div className="p-4 my-2 bg-gray-50 rounded-lg shadow-md border border-gray-300">
                    <h2 className="text-lg font-bold mb-2">Revendedores Disponíveis</h2>
                    <div className="space-y-2">
                        {filteredRevendedores.length > 0 ? (
                            filteredRevendedores.map((rev) => (
                                <button
                                    key={rev.id}
                                    onClick={() => handleSelectRevendedor(rev)}
                                    className="w-full flex justify-between items-center p-2 bg-white text-gray-800 rounded-md border border-gray-200 hover:bg-pink-100 transition duration-200 ease-in-out"
                                >
                                    <span>{rev.nome}</span>
                                    <span className="text-sm">{rev.id}</span>
                                </button>
                            ))
                        ) : (
                            <p>Nenhum revendedor encontrado.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedRevendedor;
