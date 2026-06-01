import React from 'react';
import './Home.css'; // Importa a folha de estilo separada da Home

export default function Home({ setTelaAtiva }) {
  return (
    <div className="home-container select-none">
      {/* Tela inicial do jogo com título, subtítulo e botão jogar. */}

      <h1 className="home-titulo font-serif">
        ASSASSIN'S CREED
      </h1>
      <h2 className="home-subtitulo font-serif">
        IRMANDADE
      </h2>

      {/* Texto de introdução e chamada para iniciar a partida. */}
      <p className="home-descricao font-sans">
        Entre no Animus e recupere os fragmentos que protegem o futuro. 
        Sua missão começa agora, na penumbra da Irmandade.
      </p>

      {/* Botão principal que muda a tela para o mapa. */}
      <button 
        onClick={() => setTelaAtiva('mapa')}
        className="home-btn-jogar font-bold uppercase tracking-wider shadow-lg"
      >
        Jogar
      </button>

    </div>
  );
}
