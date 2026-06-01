import React from 'react';
import './Conclusao.css'; // Importa a folha de estilo separada da conclusão

export default function Conclusao({ setTelaAtiva }) {
  return (
    <div className="conclusao-container select-none">
      {/* Tela final de vitória do jogo. */}
      <div className="conclusao-emblema shadow-2xl">
        <span className="emblema-icone">✔</span>
      </div>

      <h2 className="conclusao-titulo font-serif uppercase tracking-widest">Sincronização Completa</h2>

      <div className="conclusao-card shadow-2xl">
        <p className="conclusao-texto tracking-wide">
          "Parabéns, Assassino! Todas as memórias genéticas foram restauradas e a localização da Maçã do Éden foi assegurada. Você protegeu o futuro da Irmandade."
        </p>
      </div>

      {/* Ações finais para o jogador. */}
      <div className="conclusao-botoes-painel">
        <button
          onClick={() => setTelaAtiva('home')}
          className="btn-conclusao btn-reiniciar font-bold uppercase tracking-widest shadow-lg"
        >
          Menu Inicial
        </button>

        <button
          onClick={() => setTelaAtiva('creditos')}
          className="btn-conclusao btn-creditos font-bold uppercase tracking-widest shadow-lg"
        >
          Ver Créditos
        </button>
      </div>
    </div>
  );
}
