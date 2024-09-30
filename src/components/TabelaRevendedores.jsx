import '../styles/dashboard.css';
import { EyeIcon, PencilIcon , TrashIcon } from '@heroicons/react/24/solid';


const data = [
    { id: 1, nome: 'Josias', contato: '(11) 99999-9999', comissao: '20%' },
    { id: 2, nome: 'Henrique', contato: '(11) 99999-9999', comissao: '20%' },
    { id: 3, nome: 'Leonel', contato: '(11) 99999-9999', comissao: '30%' },

];

const TabelaRevendedores = () => {
    return (
        <div className="container-tabela">

            <table className="table-auto border-separate border-spacing-y-3">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Contato</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Comissão</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-sm">
                            <td className="px-2 py-2 text-center text-sm font-medium text-gray-900">{item.id}</td>
                            <td className="px-2 py-2 text-center text-sm text-gray-900">{item.nome}</td>
                            <td className="px-2 py-2 text-center text-sm text-gray-500">{item.contato}</td>
                            <td className="px-2 py-2 text-center text-sm text-gray-500">{item.comissao}</td>
                            <td className="px-2 py-2 text-center text-sm font-medium">
                                <div className="flex justify-center">
                                    <button className="btn-action text-gray-400 mr-2">
                                        <EyeIcon className="h-5 w-5" />
                                    </button>
                                    <button className="btn-action text-gray-400 mr-2">
                                        <PencilIcon  className="h-5 w-5" />
                                    </button>
                                    <button className="btn-action text-gray-400">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default TabelaRevendedores;