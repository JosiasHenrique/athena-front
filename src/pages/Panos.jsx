import TabelaPanos from "../components/Pano/TabelaPanos";
import { PanoProvider } from "../context/PanoContext";

const Panos = () => {
  return (
    <div>
      <h2 className="cadastro-titulo">Controle de Panos</h2>
      <PanoProvider>
        <TabelaPanos />
      </PanoProvider>
    </div>
  )
};

export default Panos;
