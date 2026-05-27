import React, { useState } from 'react';

export default function Jogo({ selectedPonto, setTelaAtiva }) {
  const [respostaSelecionada, setRespostaSelecionada] = useState('');
  const [respondido, setRespondido] = useState(false);
  const [resultado, setResultado] = useState('');

  // Se o jogador não clicou em nada no mapa ainda, exibe a tela de bloqueio estilizada
  if (!selectedPonto) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8 text-center bg-[#121315]">
        <div className="max-w-md p-6 bg-gradient-to-br from-[#3d0f0f] to-[#121315] border-2 border-[#542222] rounded-lg shadow-2xl">
          <h2 className="text-2xl font-serif text-[#dfd5bd] mb-3 uppercase tracking-wider">Sincronização Ausente</h2>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            Nenhuma memória genética foi localizada. Você precisa abrir o mapa tático da Irmandade e selecionar um fragmento ativo.
          </p>
          <button 
            onClick={() => setTelaAtiva('mapa')}
            className="px-6 py-2.5 bg-gradient-to-b from-[#a81c1c] to-[#590f0f] border border-[#d93838] text-[#dfd5bd] text-xs font-bold uppercase tracking-widest rounded-sm shadow-md hover:from-[#c22121] transition-all cursor-pointer"
          >
            Abrir Mapa do Animus
          </button>
        </div>
      </div>
    );
  }

  const validarResposta = () => {
    if (!respostaSelecionada) return;
    setRespondido(true);
    if (respostaSelecionada === selectedPonto.correct) {
      setResultado('CORRETO');
    } else {
      setResultado('ERRO');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#232529] to-[#121315] flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#1c1d1f] to-[#111214] border border-zinc-800 rounded-lg p-8 shadow-2xl">
        
        {/* Cabeçalho do Enigma */}
        <span className="text-xs uppercase tracking-[0.25em] text-[#ff3b3b] font-semibold block mb-1">Local Descoberto</span>
        <h1 className="text-3xl font-serif text-[#dfd5bd] border-b border-zinc-800 pb-3 mb-4">{selectedPonto.nome}</h1>
        <p className="text-xs italic text-zinc-400 mb-6">"{selectedPonto.dicaHistorica}"</p>

        {/* Caixa da Pergunta */}
        <div className="bg-[#121315] border border-zinc-800 p-6 rounded mb-6">
          <p className="text-base text-[#dfd5bd] font-medium leading-relaxed">{selectedPonto.pergunta}</p>
        </div>

        {/* Opções de Resposta */}
        <div className="space-y-3 mb-6">
          {selectedPonto.options.map((opcao, index) => (
            <label 
              key={index}
              className={`flex items-center p-4 rounded border transition-all cursor-pointer ${
                respostaSelecionada === opcao 
                  ? 'bg-[#3d0f0f]/40 border-[#ff3b3b] text-[#dfd5bd]' 
                  : 'bg-[#161719] border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <input 
                type="radio" 
                name="quiz" 
                value={opcao} 
                checked={respostaSelecionada === opcao}
                onChange={(e) => setRespostaSelecionada(e.target.value)}
                disabled={respondido}
                className="mr-3 accent-[#ff3b3b]"
              />
              <span className="text-sm font-medium">{opcao}</span>
            </label>
          ))}
        </div>

        {/* Botão de Ação ou Painel de Resultado */}
        {!respondido ? (
          <button 
            onClick={validarResposta}
            disabled={!respostaSelecionada}
            className="w-full py-3 bg-gradient-to-b from-[#a81c1c] to-[#590f0f] border-2 border-[#d93838] rounded-sm text-[#dfd5bd] font-bold uppercase tracking-widest text-xs shadow-lg hover:from-[#c22121] transition-all disabled:opacity-40 cursor-pointer"
          >
            Sincronizar Resposta
          </button>
        ) : (
          <div className={`p-4 rounded border text-center ${resultado === 'CORRETO' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400' : 'bg-red-950/40 border-red-500 text-red-400'}`}>
            <h3 className="text-lg font-bold uppercase tracking-wider mb-1">{resultado === 'CORRETO' ? '✓ Memória Sincronizada' : '✗ Falha na Sincronização'}</h3>
            <p className="text-xs text-zinc-300 mb-4">{resultado === 'CORRETO' ? `Pista obtida: [ ${selectedPonto.pista} ]` : 'Tente novamente acessando o ponto.'}</p>
            <button 
              onClick={() => {
                setRespondido(false);
                setRespostaSelecionada('');
                setTelaAtiva('mapa');
              }}
              className="px-4 py-1.5 bg-zinc-800 text-xs text-white uppercase rounded hover:bg-zinc-700 transition-all cursor-pointer"
            >
              Voltar ao Mapa
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
