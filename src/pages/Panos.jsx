import TabelaPanos from "../components/Pano/TabelaPanos";
import { PanoProvider } from "../context/PanoContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Panos = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2 className="cadastro-titulo">Controle de Panos</h2>
        <PanoProvider>
          <TabelaPanos />
        </PanoProvider>
      </div>
      <Footer />
    </>

  )
};

export default Panos;
