import { useState } from 'react';
import { gerarRelatorioVendas } from '../../api/apiVenda';
import { toast } from 'react-toastify';
import { ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

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



      <div className={`fixed inset-0 z-50 ${isModalOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg   w-11/12 md:w-1/4">
            <div className="flex justify-between items-center mb-4 cabecalho-modal">
              <h2 className="text-lg font-semibold text-black p-2">Selecione o Período</h2>
              <button onClick={closeModal} className="text-black p-2 hover:text-gray-200">
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="content-modal">
            <div className="flex flex-col items-center text-center">
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 p-2 mt-2">
      Data Inicial
    </label>
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="mt-1 w-80 border-2 rounded-md p-2" 
    />
  </div>

  <div className="w-full mt-1">
    <label className="block text-sm font-medium text-gray-700 p-2 mt-2">
      Data Final
    </label>
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="mt-1 w-80 border-2 rounded-md p-2" 
    />
  </div>
</div>



              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}

              <div className="text-center">
                <button
                  onClick={handleClick}
                  className={`text-white rounded-md p-2 px-5 mt-6 mb-2 hover:bg-pink-500 transition duration-200 ease-in-out bg-athena`}
                >
                  Gerar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotaoRelatorioVendas;