import { createContext, useState, useEffect } from 'react';

// 1. Criamos e exportamos o contexto
export const GameContext = createContext();

// 2. Criamos e exportamos o Provider que envolverá o App
export function GameProvider({ children }) {
  const [progresso, setProgresso] = useState(() => {
    // Carrega o progresso do Animus salvo localmente
    const salvo = localStorage.getItem('assassins_creed_v1');
    return salvo ? JSON.parse(salvo) : { pistas: [], pontosResolvidos: [] };
  });

  // Salva o progresso automaticamente no LocalStorage
  useEffect(() => {
    localStorage.setItem('assassins_creed_v1', JSON.stringify(progresso));
  }, [progresso]);

  // Função para adicionar uma nova pista ao inventário
  const adicionarPista = (pontoId, textoPista) => {
    setProgresso(prev => {
      // Impede de adicionar a mesma pista duas vezes
      if (prev.pontosResolvidos.includes(pontoId)) return prev;
      
      return {
        ...prev,
        pontosResolvidos: [...prev.pontosResolvidos, pontoId],
        pistas: [...prev.pistas, textoPista]
      };
    });
  };

  // Função para resetar o jogo (limpar inventário e mapa)
  const limparProgresso = () => {
    const estadoInicial = { pistas: [], pontosResolvidos: [] };
    setProgresso(estadoInicial);
    localStorage.removeItem('assassins_creed_v1');
  };

  return (
    <GameContext.Provider value={{ progresso, adicionarPista, limparProgresso }}>
      {children}
    </GameContext.Provider>
  );
}