import React from 'react';
import './Creditos.css'; // Importa o arquivo de estilos separado

export default function Creditos({ setTelaAtiva }) {
  return (
    <div className="creditos-container select-none">
      {/* Cartão de agradecimento e créditos do jogo. */}
      <div className="creditos-card shadow-2xl">
        <p className="creditos-titulo font-serif">Muito obrigado por jogar!</p>
        <p className="creditos-autor uppercase tracking-widest font-semibold">
          Desenvolvido por Mateus Ferreira Salustiano
        </p>
      </div>

      {/* Botão que leva o jogador de volta ao menu inicial. */}
      <button
        onClick={() => setTelaAtiva('home')}
        className="creditos-botao font-bold uppercase tracking-[0.2em] shadow-lg"
      >
        Voltar ao Início
      </button>
    </div>
  );
}
