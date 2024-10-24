import { useState } from 'react';
import { gerarRelatorioVendas } from '../../api/apiVenda';
import { toast } from 'react-toastify';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const BotaoRelatorioVendas = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    if (!startDate || !endDate) {
      setErrorMessage('Por favor, selecione um período válido.');
      return;
    }

    try {
      await gerarRelatorioVendas(startDate, endDate);
      setErrorMessage(null); // Limpa qualquer mensagem de erro após o sucesso
      setIsModalOpen(false); // Fecha o modal após o sucesso
    } catch (error) {
      setErrorMessage('Erro ao tentar gerar o relatório. Verifique os detalhes no console.');
      toast.error(error.message, {
        theme: "colored"
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        className="text-white rounded-md p-2 mb-4 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena"
        onClick={openModal}
      >
        <ArrowDownTrayIcon className="h-5 w-5 inline" /> Relatório
      </button>


      {isModalOpen && finalizar modal (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Selecione o Período</h2>
 
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Data de Início
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Data de Fim
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Gerar Relatório
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotaoRelatorioVendas;
