import React from 'react';
import './Capitulos.css'; // Importa a folha de estilo separada de capítulos

export default function Capitulos({ setTelaAtiva, faseAtual }) {
  const listaCapitulos = [
    { id: 1, titulo: "Capítulo 1: Sincronização de Mapas", desc: "Entre no Animus e encontre as coordenadas iniciais deixadas pelo seu ancestral." },
    { id: 2, titulo: "Capítulo 2: A Rede da Irmandade", desc: "Acesse os nodos criptografados para expandir a rede de comunicação." },
    { id: 3, titulo: "Capítulo 3: Fragmento de Eden", desc: "Recupere o artefato sagrado escondido no coração da cidade." },
    { id: 4, titulo: "Capítulo 4: Codificação do Animus", desc: "Repare os blocos de memória danificados do sistema virtual." },
    { id: 5, titulo: "Capítulo 5: Confronto Final", desc: "O teste de sincronização definitiva. Proteja o legado dos Assassinos." }
  ];

  const sequenciaAtual = faseAtual || 1;

  return (
    <div className="capitulos-container select-none">
      <h2 className="capitulos-titulo font-serif uppercase tracking-widest">Arquivos de Memória</h2>

      <div className="capitulos-lista">
        {listaCapitulos.map((cap) => {
          const bloqueado = cap.id > sequenciaAtual;

          return (
            <div
              key={cap.id}
              className={`capitulo-card shadow-lg ${bloqueado ? 'capitulo-bloqueado' : 'capitulo-liberado'}`}
            >
              <div className="capitulo-header">
                <h3 className="capitulo-nome font-serif">{cap.titulo}</h3>
                {bloqueado ? (
                  <span className="status-badge badge-trancado uppercase font-bold tracking-widest">Trancado</span>
                ) : (
                  <span className="status-badge badge-disponivel uppercase font-bold tracking-widest">Sincronizado</span>
                )}
              </div>

              <p className="capitulo-desc">{cap.desc}</p>

              {!bloqueado && (
                <button
                  onClick={() => setTelaAtiva('mapa')}
                  className="capitulo-btn font-bold uppercase tracking-widest"
                >
                  Acessar Memória
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
