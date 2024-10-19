import { useEffect, useState } from 'react';
import { fetchPanos, deletePano } from '../../api/apiPano';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from '../ModalDelete';
import ModalPano from './ModalPano'; 
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { usePano } from '../../context/PanoContext'; 

const TabelaPanos = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditing, setIsModalEditing] = useState(false);
    const [isModalPanoOpen, setIsModalPanoOpen] = useState(false);
    const [selectedPanoId, setSelectedPanoId] = useState(null);
    const { atualizarPano, resetPano, definirRevendedor } = usePano(); 

    const loadPanos = async () => {
        const panos = await fetchPanos();
        setData(panos);
    };

    const confirmDelete = async () => {
        if (selectedPanoId) {
            try {
                await deletePano(selectedPanoId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedPanoId));
                toast.success("Pano excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir o pano:", error);
                toast.error("Erro ao excluir o pano.");
            } finally {
                setIsModalOpen(false);
                setSelectedPanoId(null);
            }
        }
    };

    useEffect(() => {
        loadPanos();
    }, []);

    const filteredData = data.filter((item) =>
        item.revendedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const iniciarNovoPano = () => {
        setIsModalEditing(false);
        resetPano(); 
        setIsModalPanoOpen(true);
    };

    const carregarPanoParaEdicao = (item) => {
        setIsModalEditing(true);
        setIsModalPanoOpen(true); 
        atualizarPano('id', item.id);
        definirRevendedor(item.revendedor);
        atualizarPano('observacoes', item.observacoes);
        atualizarPano('itens', item.itens); 
    };

    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button
                    className="text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena"
                    onClick={ () => iniciarNovoPano()}
                >
                    <PlusIcon className="h-5 w-5 inline" /> Novo Pano
                </button>

                <input
                    type="text"
                    placeholder="Pesquisar pano por revendedor"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />
            </div>
            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhum pano encontrado.</p>
            ) : (
                <table className="table-auto border-separate border-spacing-y-3">
                    <thead>
                        <tr>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Revendedor</th>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Comissão do Revendedor</th>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Produtos no pano</th>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Observação</th>
                            <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} className='tb-athena'> 
                                <td className="px-2 py-2 text-center text-sm text-gray-900">{item.revendedor.nome}</td>
                                <td className="px-2 py-2 text-center text-sm text-gray-900">{item.revendedor.comissao}%</td>
                                <td className="px-2 py-2 text-center text-sm text-gray-900">{item.itens.length}</td>
                                <td className="px-2 py-2 text-center text-sm text-gray-900">{item.observacoes}</td>
                                <td className="px-2 py-2 text-center text-sm font-medium">
                                    <div className="flex justify-center">
                                        <button onClick={() => carregarPanoParaEdicao(item)}
                                            className="btn-action text-gray-400 mr-2 px-2 py-2"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            className="btn-action text-gray-400 px-2 py-2"
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setSelectedPanoId(item.id);
                                            }}
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ModalDelete
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                item="pano"
            />
            <ModalPano
                isOpen={isModalPanoOpen}
                onClose={() => setIsModalPanoOpen(false)}
                refreshPanos={loadPanos}
                isEditing={isModalEditing}
            />
        </div>
    );
};

export default TabelaPanos;
