import React from 'react';
import './Inventario.css'; // Importa a folha de estilo separada do inventário

export default function Inventario({ 
  acertos, 
  erros, 
  pistasColetadas, 
  setPistasColetadas, 
  setTelaAtiva, 
  setAcertos, 
  setErros, 
  setFaseAtual 
}) {

  // Função para resetar todo o progresso do jogador
  const resetarAnimus = () => {
    if (window.confirm("Aviso: Isso vai deletar todo o seu progresso salvo. Deseja reiniciar o jogo?")) {
      localStorage.clear();
      setAcertos(0);
      setErros(0);
      setFaseAtual(1);
      setPistasColetadas([]);
      setTelaAtiva('home');
    }
  };

  return (
    <div className="inventario-container select-none">
      
      {/* Título Principal */}
      <h2 className="inventario-titulo font-serif uppercase tracking-widest">
        Inventário de Sincronização
      </h2>

      {/* Grid de Estatísticas Rápidas */}
      <div className="inventario-stats-grid">
        <div className="stat-card card-acertos">
          <p className="stat-label">Nodos Sincronizados</p>
          <p className="stat-numero">{acertos}</p>
        </div>
        <div className="stat-card card-erros">
          <p className="stat-label">Falhas de Conexão</p>
          <p className="stat-numero">{erros}</p>
        </div>
      </div>

      {/* Seção das Pistas Coletadas */}
      <div className="inventario-pistas-secao">
        <h3 className="pistas-subtitulo font-serif uppercase tracking-wider">
          Fragmentos de Memória Obtidos
        </h3>
        
        {pistasColetadas.length === 0 ? (
          <p className="pistas-vazio">Nenhum fragmento de DNA coletado até o momento.</p>
        ) : (
          <div className="pistas-lista">
            {pistasColetadas.map((pista) => (
              <div key={pista.id} className="pista-item border-l-4">
                <span className="pista-icone">✦</span>
                <p className="pista-texto">{pista.texto}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Painel de Botões de Ação */}
      <div className="inventario-botoes-painel">
        <button 
          onClick={() => setTelaAtiva('mapa')} 
          className="btn-inventario btn-voltar font-bold uppercase tracking-wider shadow-lg"
        >
          Voltar ao Mapa
        </button>
        
        {/* TEXTO ALTERADO DE "RESETAR ANIMUS" PARA "RESETAR JOGO" */}
        <button 
          onClick={resetarAnimus} 
          className="btn-inventario btn-resetar font-bold uppercase tracking-wider shadow-lg"
        >
          Resetar Jogo
        </button>
      </div>

    </div>
  );
}
