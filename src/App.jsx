import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Home from './pages/Home.jsx';
import Mapa from './pages/mapa.jsx';
import Inventario from './pages/Inventario.jsx';
import Creditos from './pages/Creditos.jsx';
import Quiz from './pages/Quiz.jsx';
import Jogo from './pages/Jogo.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Conclusao from './pages/Conclusao.jsx';

export default function App() {
  // Estado da tela atual, começa na tela inicial.
  const [telaAtiva, setTelaAtiva] = useState('home');

  // Ponto selecionado no mapa para usar no quiz/jogo.
  const [selectedPonto, setSelectedPonto] = useState(null);

  // Controla se o botão Voltar deve ser mostrado apenas em mobile.
  const [mostrarBotaoMobile, setMostrarBotaoMobile] = useState(false);

  // Guarda o número de acertos e erros persistindo no localStorage.
  const [acertos, setAcertos] = useState(() => Number(localStorage.getItem('animus_acertos') || 0));
  const [erros, setErros] = useState(() => Number(localStorage.getItem('animus_erros') || 0));

  // Pistas coletadas são gravadas como um array de objetos.
  const [pistasColetadas, setPistasColetadas] = useState(() => {
    const saved = localStorage.getItem('animus_pistas');
    return saved ? JSON.parse(saved) : [];
  });

  // Fase atual do jogador, usada para liberar níveis.
  const [faseAtual, setFaseAtual] = useState(() => Number(localStorage.getItem('animus_faseAtual') || 1));

  // Sempre que acertos mudar, salvo no localStorage.
  useEffect(() => {
    localStorage.setItem('animus_acertos', String(acertos));
  }, [acertos]);

  // Sempre que erros mudar, salvo no localStorage.
  useEffect(() => {
    localStorage.setItem('animus_erros', String(erros));
  }, [erros]);

  // Sempre que novas pistas forem coletadas, salvo no localStorage.
  useEffect(() => {
    localStorage.setItem('animus_pistas', JSON.stringify(pistasColetadas));
  }, [pistasColetadas]);

  // Salva a fase atual da campanha.
  useEffect(() => {
    localStorage.setItem('animus_faseAtual', String(faseAtual));
  }, [faseAtual]);

  // Exibe o botão móvel de Voltar apenas em telas pequenas.
  useEffect(() => {
    const atualizarTamanho = () => setMostrarBotaoMobile(window.innerWidth < 768);
    atualizarTamanho();
    window.addEventListener('resize', atualizarTamanho);
    return () => window.removeEventListener('resize', atualizarTamanho);
  }, []);

  // Função que adiciona acerto e também guarda a pista coletada.
  const adicionarAcerto = (texto) => {
    setAcertos((prev) => prev + 1);
    setPistasColetadas((prev) => [...prev, { id: Date.now(), texto }]);

    // Se o ponto selecionado for igual ou maior que a fase atual, atualizo para a próxima fase.
    if (selectedPonto?.id && selectedPonto.id >= faseAtual) {
      setFaseAtual((prev) => Math.min(5, selectedPonto.id + 1));
    }
  };

  // Função que registra erro e também salva como pista no inventário.
  const adicionarErro = (texto) => {
    setErros((prev) => prev + 1);
    setPistasColetadas((prev) => [...prev, { id: Date.now(), texto }]);
  };

  // Renderiza a tela correta com base no estado de navegação.
  const renderTela = () => {
    switch (telaAtiva) {
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
      case 'creditos':
        return <Creditos setTelaAtiva={setTelaAtiva} />;
      case 'quiz':
        return (
          <Quiz
            selectedPonto={selectedPonto}
            setTelaAtiva={setTelaAtiva}
            adicionarAcerto={adicionarAcerto}
            adicionarErro={adicionarErro}
          />
        );
      case 'jogo':
        return (
          <Jogo
            selectedPonto={selectedPonto}
            setTelaAtiva={setTelaAtiva}
            adicionarAcerto={adicionarAcerto}
            adicionarErro={adicionarErro}
          />
        );
      case 'capitulos':
        return <Capitulos setTelaAtiva={setTelaAtiva} faseAtual={faseAtual} />;
      case 'conclusao':
        return <Conclusao setTelaAtiva={setTelaAtiva} />;
      default:
        return <Home setTelaAtiva={setTelaAtiva} />;
    }
  };

  // Define para onde o botão Voltar deve mandar no mobile.
  const voltarTela = telaAtiva === 'quiz' || telaAtiva === 'jogo' ? 'mapa' : 'home';

  return (
    <div className="app-root flex flex-col md:flex-row min-h-screen w-full bg-[#090a0b] text-[#dfd5bd] overflow-x-hidden">
      {/* Navegação lateral / mobile */}
      <aside className="app-aside w-full md:w-28 bg-gradient-to-b from-[#111214] to-[#08090a] border-b md:border-b-0 md:border-r border-[#2b2d31] flex flex-row md:flex-col items-center justify-around md:justify-start py-4 md:py-6 md:gap-6 shadow-xl z-30 shrink-0">
        <button onClick={() => setTelaAtiva('home')} className="font-bold text-xs md:text-sm tracking-widest text-cyan-400 hover:text-white transition-colors uppercase">
          Início
        </button>
        <button onClick={() => setTelaAtiva('mapa')} className="font-bold text-xs md:text-sm tracking-widest hover:text-white transition-colors uppercase">
          Mapa
        </button>
        <button onClick={() => setTelaAtiva('inventario')} className="font-bold text-xs md:text-sm tracking-widest hover:text-white transition-colors uppercase">
          Inventário
        </button>
        <button onClick={() => setTelaAtiva('creditos')} className="font-bold text-xs md:text-sm tracking-widest hover:text-white transition-colors uppercase">
          Créditos
        </button>
      </aside>

      <main className="app-main flex-1 min-h-screen relative overflow-y-auto overflow-x-hidden flex items-start justify-start bg-[#121315] p-4 md:p-8 md:items-center md:justify-center">
        {renderTela()}
      </main>

      {/* Botão móvel de voltar, fixo na base da janela e visível apenas no mobile. */}
      {telaAtiva !== 'home' && mostrarBotaoMobile && typeof document !== 'undefined' && createPortal(
        <div
          className="md:hidden"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '1rem',
            pointerEvents: 'none'
          }}
        >
          <button
            onClick={() => setTelaAtiva(voltarTela)}
            style={{
              pointerEvents: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '9999px',
              backgroundColor: '#111827',
              padding: '0.75rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#f8fafc',
              boxShadow: '0 12px 30px rgba(0,0,0,0.45)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'background-color 0.2s ease'
            }}
          >
            <span style={{ width: '0.625rem', height: '0.625rem', borderRadius: '9999px', backgroundColor: '#10b981' }} />
            Voltar
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
