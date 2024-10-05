import { EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { fetchRevendedores, deleteRevendedor } from '../../api/apiRevendedor';
import ModalRevendedor from './ModalRevendedor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import useRevendedorForm from '../../hooks/useRevendedorForm';
import ModalDelete from '../ModalDelete';

const TabelaRevendedores = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal de exclusão
    const [selectedRevendedorId, setSelectedRevendedorId] = useState(null); // ID do revendedor a ser excluído

    const loadRevendedores = async () => {
        const revendedores = await fetchRevendedores();
        setData(revendedores);
    };

    const confirmDelete = async () => {
        if (selectedRevendedorId) {
            try {
                await deleteRevendedor(selectedRevendedorId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedRevendedorId));
                toast.success("Revendedor excluído com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir o revendedor:", error);
                toast.error("Erro ao excluir o revendedor."); 
            } finally {
                setIsModalOpen(false); 
                setSelectedRevendedorId(null); 
            }
        }
    };

 

    const {
        isModalOpen: isEditModalOpen,
        setModalOpen,
        selectedRevendedor,
        isEditing,
        loading,
        handleModalOpen,
        handleEditModalOpen,
        handleSave,
    } = useRevendedorForm(loadRevendedores);

    useEffect(() => {
        loadRevendedores();
    }, []);

    const filteredData = data.filter((item) =>
        item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button onClick={handleModalOpen} className="bg-athena text-white p-2 rounded mb-4">
                    <PlusIcon className="h-5 w-5 inline" /> Novo Revendedor
                </button>
                
                <input
                    type="text"
                    placeholder="Pesquisar revendedor por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />
            </div>
            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhum revendedor encontrado.</p>
            ) : (
            <table className="table-auto border-separate border-spacing-y-3">
                <thead>
                    <tr>
                        <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Nome</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Contato</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Comissão</th>
                        <th className="px-2 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">Id</th>
                        <th className="px-2 py-2 text-center text-xs font-medium text-black uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-sm">
                            <td className="px-2 py-2 text-left text-sm text-gray-900">{item.nome}</td>
                            <td className="px-2 py-2 text-left text-sm text-gray-500">{item.contato}</td>
                            <td className="px-2 py-2 text-left text-sm text-gray-500">{item.comissao}</td>
                            <td className="px-2 py-2 text-left text-sm text-gray-500">{item.id}</td>
                            <td className="px-2 py-2 text-center text-sm font-medium">
                                <div className="flex justify-center">
                                    <button className="btn-action text-gray-400 mr-2 px-2 py-2">
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        className="btn-action text-gray-400 mr-2 px-2 py-2" 
                                        onClick={() => handleEditModalOpen(item)}
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setSelectedRevendedorId(item.id);
                                            setIsModalOpen(true);
                                        }} 
                                        className="btn-action text-gray-400 px-2 py-2"
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
            <ModalRevendedor 
                isOpen={isEditModalOpen} 
                onClose={() => setModalOpen(false)} 
                revendedor={selectedRevendedor} 
                isEditing={isEditing} 
                onSave={handleSave}
                loading={loading} 
            />
            <ModalDelete 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={confirmDelete} 
                item="revendedor"
            />
        </div>
    );
};

export default TabelaRevendedores;
