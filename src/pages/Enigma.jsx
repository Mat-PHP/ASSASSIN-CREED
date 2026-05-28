import React, { useState } from 'react';
import './Enigma.css'; // Importa a folha de estilo separada do enigma

export default function Enigma({ setTelaAtiva }) {
  const [resposta, setResposta] = useState('');

  const checarResposta = (e) => {
    e.preventDefault();
    
    // Resposta correta fictícia para validação do enigma (mude se necessário)
    const respostaCorreta = "irmandade"; 

    if (resposta.trim().toLowerCase() === respostaCorreta) {
      alert("Enigma Desvendado! Sincronização estabelecida.");
      setResposta('');
      setTelaAtiva('mapa'); // Retorna o jogador ao mapa
    } else {
      alert("Falha crítica! Código incorreto inserido no Animus.");
    }
  };

  return (
    <div className="enigma-container select-none">
      
      {/* Título Principal */}
      <h2 className="enigma-titulo font-serif uppercase tracking-widest">
        Glifos Ocultos
      </h2>

      {/* Caixa do Enigma Criptografado */}
      <div className="enigma-card shadow-2xl">
        <p className="enigma-texto tracking-wide">
          "Trabalhamos nas trevas para servir à luz. Juntos formamos a nossa..."
        </p>
        <span className="enigma-dica font-sans uppercase tracking-widest">Dica: 9 letras</span>
      </div>

      {/* Formulário de Input */}
      <form onSubmit={checarResposta} className="enigma-formulario">
        <input 
          type="text"
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          placeholder="Decifre o glifo aqui..."
          className="enigma-input uppercase tracking-wider text-center"
          required
        />

        <button 
          type="submit"
          className="enigma-btn font-bold uppercase tracking-widest shadow-lg"
        >
          Injetar Código
        </button>
      </form>

    </div>
  );
}
