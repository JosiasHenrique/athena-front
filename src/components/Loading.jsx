import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <ClipLoader color="#E8A2A2" size={50} />
            <p className="mt-4 text-lg text-gray-700">Carregando...</p>
        </div>
    );
};
export default Loading;
