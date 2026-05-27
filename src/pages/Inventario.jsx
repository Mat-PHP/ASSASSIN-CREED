import React, { useState } from 'react';

export default function Inventario({ 
  acertos, 
  erros, 
  pistasColetadas = [], 
  setPistasColetadas, 
  setTelaAtiva, 
  setAcertos, 
  setErros, 
  setFaseAtual 
}) {
  const totalPerguntas = acertos + erros;
  const precisao = totalPerguntas > 0 ? Math.round((acertos / totalPerguntas) * 100) : 0;

  const [draggedId, setDraggedId] = useState(null);
  const [respostaEnigma, setRespostaEnigma] = useState('');
  const [feedbackEnigma, setFeedbackEnigma] = useState(null);

  // Ativado quando o usuário começa a arrastar o bloco
  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Permite que o bloco seja solto em cima de outro slot
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Executado quando o bloco é solto, forçando a troca de posições fixa
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = pistasColetadas.findIndex(p => p.id === draggedId);
    const targetIndex = pistasColetadas.findIndex(p => p.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const novaLista = [...pistasColetadas];
      // Remove o item da posição antiga e insere na nova posição fixa
      const [itemRemovido] = novaLista.splice(draggedIndex, 1);
      novaLista.splice(targetIndex, 0, itemRemovido);

      setPistasColetadas(novaLista);
      localStorage.setItem('animus_pistas', JSON.stringify(novaLista));
    }
    setDraggedId(null);
  };

  const verificarEnigmaFinal = () => {
    const tentativa = respostaEnigma.trim().toLowerCase();
    // Aceita variações da palavra chave para não dar erro na correção
    if (tentativa.includes("pista") || tentativa.includes("liberada") || tentativa.includes("futuro")) {
      setFeedbackEnigma({ msg: "🏆 PARABÉNS! Sincronização Concluída. Código aceito no Animus!", color: "text-emerald-400" });
    } else {
      setFeedbackEnigma({ msg: "❌ Falha na sincronia. Reordene os fragmentos e digite novamente.", color: "text-rose-400" });
    }
  };

  const resetarJogoCompleto = () => {
    setAcertos(0);
    setErros(0);
    if (setFaseAtual) setFaseAtual(1);
    if (setPistasColetadas) setPistasColetadas([]);
    
    localStorage.setItem('animus_acertos', 0);
    localStorage.setItem('animus_erros', 0);
    localStorage.setItem('animus_fase', 1);
    localStorage.setItem('animus_pistas', JSON.stringify([]));
    setFeedbackEnigma(null);
    setRespostaEnigma('');
  };

  return (
    <div className="w-full min-h-screen bg-[#05060b] text-white flex flex-col p-10 relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.08),transparent_45%)] pointer-events-none" />

      {/* Cabeçalho */}
      <div className="relative z-10 border-b border-white/10 pb-6 mb-10 flex justify-between items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-red-500 font-bold">Mecânica Drag & Drop</p>
          <h1 className="text-4xl font-black tracking-wider text-white uppercase mt-2">Sincronismo de Pistas</h1>
        </div>
        
        {totalPerguntas > 0 && (
          <button 
            onClick={resetarJogoCompleto}
            className="text-[10px] uppercase tracking-widest text-rose-400 border border-rose-500/20 bg-rose-500/5 px-4 py-2 rounded-full hover:bg-rose-500/20 transition cursor-pointer"
          >
            Zerar Histórico
          </button>
        )}
      </div>

      {/* Cards de Pontos */}
      <div className="relative z-10 max-w-4xl grid gap-6 sm:grid-cols-3 mb-10">
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Respostas Corretas</p>
          </div>
          <p className="text-5xl font-black text-emerald-400 mt-6">{acertos}</p>
        </div>

        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <p className="text-xs uppercase tracking-widest text-rose-400 font-bold">Respostas Incorretas</p>
          </div>
          <p className="text-5xl font-black text-rose-400 mt-6">{erros}</p>
        </div>

        <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Taxa de Sincronia</p>
          </div>
          <p className="text-5xl font-black text-white mt-6">{precisao}%</p>
        </div>
      </div>

      {/* Área do Drag and Drop */}
      <div className="relative z-10 max-w-4xl mb-10">
        <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">Arraste os Fragmentos para ordenar a Frase Secreta</h2>
        
        {pistasColetadas.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-8 text-center text-sm text-slate-500 bg-black/20">
            Nenhuma pista coletada. Responda os desafios no <button onClick={() => setTelaAtiva('mapa')} className="text-red-400 underline cursor-pointer bg-transparent border-none p-0">Mapa</button> para liberar fragmentos.
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 p-5 bg-black/40 rounded-2xl border border-white/5 min-h-[80px] items-center">
            {pistasColetadas.map((pista) => (
              <div
                key={pista.id}
                draggable
                onDragStart={(e) => handleDragStart(e, pista.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, pista.id)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-950/40 to-black border border-red-500/30 font-mono text-xs font-bold text-white shadow-md cursor-grab active:cursor-grabbing transition-all hover:border-red-500 select-none touch-none"
              >
                ⣿ {pista.texto}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Validação do Enigma Final */}
      <div className="relative z-10 max-w-4xl bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
        <h2 className="text-sm font-black uppercase tracking-wider text-red-500 mb-2">Desvendar Enigma Final</h2>
        <p className="text-xs text-slate-400 mb-4">Insira a frase traduzida combinando as ordens das suas peças acima:</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            value={respostaEnigma}
            onChange={(e) => setRespostaEnigma(e.target.value)}
            placeholder="Digite o código decifrado aqui..." 
            className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 font-mono text-white"
          />
          <button 
            onClick={verificarEnigmaFinal}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 font-bold text-xs uppercase tracking-widest rounded-xl transition cursor-pointer shrink-0"
          >
            Validar Código
          </button>
        </div>
        {feedbackEnigma && <p className={`mt-4 font-black tracking-wide text-xs ${feedbackEnigma.color}`}>{feedbackEnigma.msg}</p>}
      </div>

    </div>
  );
}
