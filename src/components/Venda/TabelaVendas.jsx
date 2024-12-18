import { useEffect, useState } from 'react';
import { fetchVendas, deleteVenda } from '../../api/apiVenda';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from '../ModalDelete';
import ModalVenda from './ModalVenda';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useVenda } from '../../context/VendaContext';
import BotaoRelatorioVendas from './BotaoRelatorio';

const TabelaVendas = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVendaOpen, setIsModalVendaOpen] = useState(false);
    const [selectedVendaId, setSelectedVendaId] = useState(null);
    const [isModalEditing, setIsModalEditing] = useState(false);
    const { atualizarVenda, definirCliente, definirRevendedor, resetVenda } = useVenda();

    const loadVendas = async () => {
        const vendas = await fetchVendas();
        setData(vendas);
    };

    const confirmDelete = async () => {
        if (selectedVendaId) {
            try {
                await deleteVenda(selectedVendaId);
                setData((prevData) => prevData.filter((item) => item.id !== selectedVendaId));
                toast.success("Venda excluída com sucesso!");
            } catch (error) {
                console.error("Erro ao excluir a venda:", error);
                toast.error(error.message, {
                    theme: "colored"
                });
            } finally {
                setIsModalOpen(false);
                setSelectedVendaId(null);
            }
        }
    };

    const iniciarNovaVenda = () => {
        setIsModalEditing(false);
        resetVenda();
        setIsModalVendaOpen(true);
    };

    const carregarVendaParaEdicao = (venda) => {
        setIsModalEditing(true);
        setIsModalVendaOpen(true);
        atualizarVenda('id', venda.id);
        atualizarVenda('tipo_pagamento', venda.tipo_pagamento);
        atualizarVenda('data_venda', venda.data_venda);
        definirCliente(venda.cliente);
        definirRevendedor(venda.revendedor);
        atualizarVenda('produtos', venda.itens);
    };


    useEffect(() => {
        loadVendas();
    }, []);

    const filteredData = data.filter((item) =>
        item.cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.revendedor.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-tabela">
            <ToastContainer />
            <div className="utils-tabela">
                <button
                    className="text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena"
                    onClick={() => iniciarNovaVenda()}
                >
                    <PlusIcon className="h-5 w-5 inline" /> Nova Venda
                </button>

                <input
                    type="text"
                    placeholder="Pesquisar venda por nome do cliente ou revendedor"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-search p-2 border rounded mb-4"
                />
                <BotaoRelatorioVendas />
            </div>
            {filteredData.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhuma venda encontrada.</p>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="table-auto border-separate border-spacing-y-3 mx-auto">
                        <thead>
                            <tr>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Data</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Pagamento</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Cliente</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Revendedor</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Comissão(Rev)</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Valor</th>
                                <th className="px-2 py-2 text-center text-xs font-large text-black uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => {
                                const totalVenda = item.itens.reduce((acc, produto) => acc + produto.valor_total, 0);
                                const totalComissao = item.itens.reduce((acc, produto) => acc + produto.valor_comissao, 0);

                                return (
                                    <tr key={item.id} className="tb-athena">
                                        <td className="px-2 py-2 text-center text-sm text-gray-900">{new Date(item.data_venda).toLocaleDateString('pt-BR')}</td>
                                        <td className="px-2 py-2 text-center text-sm text-gray-900">{item.tipo_pagamento}</td>
                                        <td className="px-2 py-2 text-center text-sm text-gray-900">{item.cliente.nome}</td>
                                        <td className="px-2 py-2 text-center text-sm text-gray-900">{item.revendedor.nome}</td>
                                        <td className="px-2 py-2 text-center text-sm text-gray-900">
                                            {totalComissao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm text-gray-900">
                                            {totalVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-2 py-2 text-center text-sm font-medium">
                                            <div className="flex justify-center">
                                                <button className="btn-action text-gray-400 mr-2 px-2 py-2">
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    className="btn-action text-gray-400 mr-2 px-2 py-2"
                                                    onClick={() => carregarVendaParaEdicao(item)}
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setSelectedVendaId(item.id);
                                                    }}
                                                    className="btn-action text-gray-400 px-2 py-2"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            <ModalDelete
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                item="venda"
            />
            <ModalVenda
                isOpen={isModalVendaOpen}
                onClose={() => setIsModalVendaOpen(false)}
                refreshVendas={loadVendas}
                isEditing={isModalEditing}
            />
        </div>
    );
};

export default TabelaVendas;
