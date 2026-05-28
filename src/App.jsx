import React, { useState } from 'react';
import Home from './pages/Home';
import Mapa from './pages/mapa';
import Inventario from './pages/Inventario';
import Enigma from './pages/Enigma';
import Quiz from './pages/Quiz';
import Conclusao from './pages/Conclusao';
import Creditos from './pages/Creditos';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('home');
  const [selectedPonto, setSelectedPonto] = useState(null);
  
  const TOTAL_DE_FASES = 5;

  const [faseAtual, setFaseAtual] = useState(() => {
    const salvo = localStorage.getItem('animus_fase');
    return salvo ? parseInt(salvo, 10) : 1;
  });

  const [acertos, setAcertos] = useState(() => {
    const salvo = localStorage.getItem('animus_acertos');
    return salvo ? parseInt(salvo, 10) : 0;
  });

  const [erros, setErros] = useState(() => {
    const salvo = localStorage.getItem('animus_erros');
    return salvo ? parseInt(salvo, 10) : 0;
  });
  
  const [pistasColetadas, setPistasColetadas] = useState(() => {
    const salvas = localStorage.getItem('animus_pistas');
    return salvas ? JSON.parse(salvas) : [];
  });

  const adicionarAcerto = (pistaTexto) => {
    setAcertos((prev) => {
      const novoValor = prev + 1;
      localStorage.setItem('animus_acertos', novoValor);
      return novoValor;
    });

    setPistasColetadas((prev) => {
      const novaLista = [...prev, { id: String(Date.now()), texto: pistaTexto }];
      localStorage.setItem('animus_pistas', JSON.stringify(novaLista));
      return novaLista;
    });

    setFaseAtual((prev) => {
      const prox = prev + 1;
      localStorage.setItem('animus_fase', prox);
      
      if (prev === TOTAL_DE_FASES) {
        setTimeout(() => {
          setTelaAtiva('creditos');
        }, 500); 
      }

      return prox;
    });
  };

  const adicionarErro = (pistaTexto) => {
    setErros((prev) => {
      const novoValor = prev + 1;
      localStorage.setItem('animus_erros', novoValor);
      return novoValor;
    });

    setPistasColetadas((prev) => {
      const novaLista = [...prev, { id: String(Date.now()), texto: pistaTexto }];
      localStorage.setItem('animus_pistas', JSON.stringify(novaLista));
      return novaLista;
    });
  };

  const renderizarTela = () => {
    switch (telaAtiva) {
      case 'home': 
        return <Home setTelaAtiva={setTelaAtiva} />;
      case 'mapa': 
        return <Mapa setTelaAtiva={setTelaAtiva} setSelectedPonto={setSelectedPonto} faseAtual={faseAtual} />;
      case 'inventario': 
        return (
          <Inventario 
            acertos={acertos} 
            erros={erros} 
            pistasColetadas={pistasColetadas}
            setPistasColetadas={setPistasColetadas}
            setTelaAtiva={setTelaAtiva} 
            setAcertos={setAcertos} 
            setErros={setErros} 
            setFaseAtual={setFaseAtual}
          />
        );
      case 'enigma': 
        return <Enigma setTelaAtiva={setTelaAtiva} />;
      case 'quiz': 
        return (
          <Quiz 
            selectedPonto={selectedPonto} 
            setTelaAtiva={setTelaAtiva} 
            adicionarAcerto={adicionarAcerto} 
            adicionarErro={adicionarErro} 
          />
        );
      case 'conclusao': 
        return <Conclusao setTelaAtiva={setTelaAtiva} />;
      case 'creditos': 
        return <Creditos setTelaAtiva={setTelaAtiva} />;
      default: 
        return <Home setTelaAtiva={setTelaAtiva} />;
    }
  };

  return (
    <div className="relative min-h-screen flex bg-[#0c0d0e] text-[#eceff4] overflow-hidden">
      
      {/* BARRA LATERAL ATUALIZADA - TEMA TECNOLÓGICO DO ANIMUS */}
      <aside className="w-28 bg-gradient-to-b from-[#111214] to-[#08090a] border-r-4 border-[#2b2d31] flex flex-col items-center py-6 gap-6 shadow-[5px_0_20px_rgba(0,0,0,0.8)] z-20 shrink-0">
        <button 
          onClick={() => setTelaAtiva('home')} 
          className={`text-[10px] uppercase font-bold tracking-[0.2em] cursor-pointer transition-all duration-300 ${telaAtiva === 'home' ? 'text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]' : 'text-white/60 hover:text-white'}`}
        >
          Início
        </button>
        
        <button 
          onClick={() => setTelaAtiva('mapa')} 
          className={`text-[10px] uppercase font-bold tracking-[0.2em] cursor-pointer transition-all duration-300 ${telaAtiva === 'mapa' ? 'text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]' : 'text-white/60 hover:text-white'}`}
        >
          Mapa
        </button>
        
        <button 
          onClick={() => setTelaAtiva('inventario')} 
          className={`text-[10px] uppercase font-bold tracking-[0.2em] cursor-pointer transition-all duration-300 ${telaAtiva === 'inventario' ? 'text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]' : 'text-white/60 hover:text-white'}`}
        >
          Inventário
        </button>

        <button 
          onClick={() => setTelaAtiva('creditos')} 
          className={`text-[10px] uppercase font-bold tracking-[0.2em] cursor-pointer transition-all duration-300 ${telaAtiva === 'creditos' ? 'text-[#00d2ff] drop-shadow-[0_0_8px_rgba(0,210,255,0.6)]' : 'text-white/60 hover:text-white'}`}
        >
          Créditos
        </button>
      </aside>

      {/* ÁREA DO CONTEÚDO PRINCIPAL */}
      <main className="flex-1 min-h-screen bg-[#090a0b] relative overflow-y-auto">
        <div className="w-full h-full">{renderizarTela()}</div>
      </main>

    </div>
  );
}
