import React, { useState } from 'react';
import Home from './pages/Home';
import Mapa from './pages/mapa';
import Inventario from './pages/Inventario';
import Enigma from './pages/Enigma';
import Quiz from './pages/Quiz';
import Conclusao from './pages/Conclusao';

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('home');
  const [selectedPonto, setSelectedPonto] = useState(null);
  
  // Controle sequencial das fases exigido pela atividade
  const [faseAtual, setFaseAtual] = useState(() => {
    const salvo = localStorage.getItem('animus_fase');
    return salvo ? parseInt(salvo, 10) : 1;
  });

  // Começa em ZERO se não houver dados gravados no navegador
  const [acertos, setAcertos] = useState(() => {
    const salvo = localStorage.getItem('animus_acertos');
    return salvo ? parseInt(salvo, 10) : 0;
  });

  const [erros, setErros] = useState(() => {
    const salvo = localStorage.getItem('animus_erros');
    return salvo ? parseInt(salvo, 10) : 0;
  });
  
  // Lista de pistas coletadas que inicia como um array VAZIO
  const [pistasColetadas, setPistasColetadas] = useState(() => {
    const salvas = localStorage.getItem('animus_pistas');
    return salvas ? JSON.parse(salvas) : [];
  });

  // Funções de incremento que atualizam o estado e gravam no localStorage
  const adicionarAcerto = (pistaTexto) => {
    setAcertos((prev) => {
      const novoValor = prev + 1;
      localStorage.setItem('animus_acertos', novoValor);
      return novoValor;
    });

    setFaseAtual((prev) => {
      const prox = prev + 1;
      localStorage.setItem('animus_fase', prox);
      return prox;
    });

    setPistasColetadas((prev) => {
      const novaLista = [...prev, { id: String(Date.now()), texto: pistaTexto }];
      localStorage.setItem('animus_pistas', JSON.stringify(novaLista));
      return novaLista;
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
      default: 
        return <Home setTelaAtiva={setTelaAtiva} />;
    }
  };

  return (
    <div className="relative min-h-screen flex bg-[#161719] text-[#dfd5bd] overflow-hidden">
      
      {/* BARRA LATERAL DA ATIVIDADE */}
      <aside className="w-28 bg-gradient-to-b from-[#2e2d2c] to-[#1c1b1a] border-r-4 border-[#403f3d] flex flex-col items-center py-6 gap-6 shadow-[inset_-5px_0_15px_rgba(0,0,0,0.6)] z-20 shrink-0">
        <button 
          onClick={() => setTelaAtiva('home')} 
          className={`text-[10px] uppercase font-bold tracking-[0.2em] cursor-pointer transition ${telaAtiva === 'home' ? 'text-[#ff3b3b]' : 'opacity-60 hover:opacity-100'}`}
        >
          Início
        </button>
        
        <button 
          onClick={() => setTelaAtiva('mapa')} 
          className={`text-[10px] uppercase font-bold tracking-[0.2em] cursor-pointer transition ${telaAtiva === 'mapa' ? 'text-[#ff3b3b]' : 'opacity-60 hover:opacity-100'}`}
        >
          Mapa
        </button>
        
        <button 
          onClick={() => setTelaAtiva('inventario')} 
          className={`text-[10px] uppercase font-bold tracking-[0.2em] cursor-pointer transition ${telaAtiva === 'inventario' ? 'text-[#ff3b3b]' : 'opacity-60 hover:opacity-100'}`}
        >
          Inventário
        </button>
      </aside>

      {/* ÁREA DO CONTEÚDO PRINCIPAL */}
      <main className="flex-1 min-h-screen bg-[#121315] relative overflow-y-auto">
        <div className="w-full h-full">{renderizarTela()}</div>
      </main>

    </div>
  );
}
