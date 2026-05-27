import React, { useState } from 'react';

export default function Quiz({ selectedPonto, setTelaAtiva, adicionarAcerto, adicionarErro }) {
  const ponto = selectedPonto;
  const [feedback, setFeedback] = useState(null);

  // Se não houver nenhum ponto selecionado no mapa
  if (!ponto) {
    return (
      <div className="p-10 text-center text-white min-h-screen bg-[#05060b] flex flex-col items-center justify-center gap-4">
        <p className="text-lg">Selecione uma fase no mapa primeiro!</p>
        <button 
          onClick={() => setTelaAtiva('mapa')} 
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs uppercase tracking-widest cursor-pointer"
        >
          Ir para o Mapa
        </button>
      </div>
    );
  }

  const handleAnswer = (option) => {
    if (option === ponto.correct) {
      // Passa a pista de sucesso para o App.jsx acumular
      adicionarAcerto(ponto.pistaCompleta || "Pista Liberada!");
      setFeedback({ msg: "CORRETO! Fragmento desbloqueado.", color: "text-emerald-400" });
      
      // Espera 1.5 segundos para o jogador ler o feedback e muda para o Inventário
      setTimeout(() => {
        setFeedback(null);
        setTelaAtiva('inventario');
      }, 1500);
    } else {
      // Passa a pista de erro/incompleta para o App.jsx acumular
      adicionarErro(ponto.pistaIncompleta || "Pista Incompleta...");
      setFeedback({ msg: "ERRADO! Sincronização falhou.", color: "text-rose-400" });
      
      // Limpa o feedback após 1.5 segundos para o jogador poder tentar clicar novamente
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-[#05060b] text-white relative">
      {/* Detalhe de fundo visual */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.05),transparent_60%)] pointer-events-none" />
      
      <h2 className="text-xl font-black text-red-500 mb-6 tracking-widest uppercase text-center relative z-10">
        {ponto.nome}
      </h2>
      
      <div className="bg-black/80 border border-red-900/30 p-6 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-md relative z-10">
        <p className="text-base mb-6 text-slate-200 font-medium text-center">
          {ponto.pergunta || "Quem é o personagem principal desta memória?"}
        </p>
        
        {/* Renderiza os botões das alternativas com cliques liberados */}
        <div className="grid gap-3">
          {ponto.options && ponto.options.map(opt => (
            <button 
              key={opt} 
              onClick={() => handleAnswer(opt)} 
              className="w-full p-4 border border-white/10 rounded-2xl bg-white/5 text-left font-bold text-sm text-gray-200 hover:border-red-500/50 hover:bg-red-500/10 transition duration-200 cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
        
        {/* Mensagem de Feedback de Acerto ou Erro */}
        {feedback && (
          <div className="mt-5 pt-4 border-t border-white/5 animate-pulse">
            <p className={`text-center font-black tracking-wide text-xs ${feedback.color}`}>
              {feedback.msg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
