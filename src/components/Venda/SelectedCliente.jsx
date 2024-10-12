import React, { useEffect, useState } from 'react';
import { useVenda } from '../../context/VendaContext';
import { fetchClientes } from '../../api/apiCliente'; 

const SelectedCliente = () => {
    const { definirCliente } = useVenda(); 
    const [clientes, setClientes] = useState([]);
    const [listaVisible, setListaVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 

    const loadClientes = async () => {
        const clientesApi = await fetchClientes();
        setClientes(clientesApi);
    };

    useEffect(() => {
        loadClientes();
    }, []);

    const handleSelectCliente = (cliente) => {
        definirCliente(cliente); 
        setListaVisible(false);
    };

    const filteredClientes = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <button 
                onClick={() => setListaVisible(!listaVisible)} 
                className="w-full bg-blue-500 text-white rounded-md p-2 mb-4 hover:bg-blue-600 transition duration-200 ease-in-out"
            >
                Selecionar Cliente
            </button>
            {listaVisible && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
            )}
            
            {listaVisible && (
                <div className="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-300">
                    <h2 className="text-lg font-bold mb-2">Clientes Disponíveis</h2>
                    <div className="space-y-2">
                        {filteredClientes.length > 0 ? (
                            filteredClientes.map((cliente) => (
                                <button
                                    key={cliente.id}
                                    onClick={() => handleSelectCliente(cliente)}
                                    className="w-full flex justify-between items-center p-2 bg-white text-gray-800 rounded-md border border-gray-200 hover:bg-blue-100 transition duration-200 ease-in-out"
                                >
                                    <span>{cliente.nome}</span>
                                    <span className="text-sm">{cliente.id}</span>
                                </button>
                            ))
                        ) : (
                            <p>Nenhum cliente encontrado.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedCliente;
