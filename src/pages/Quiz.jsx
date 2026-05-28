import React, { useState } from 'react';

// Importa as suas imagens locais de sucesso e falha
import imagemCerto from '../assets/Certo.png';
import imagemErrado from '../assets/ERRADO.png';

export default function Quiz({ selectedPonto, setTelaAtiva, adicionarAcerto, adicionarErro }) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [tentativasErradas, setTentativasErradas] = useState(0);
  
  const [mostrarTelaErro, setMostrarTelaErro] = useState(false);
  const [mostrarTelaCerto, setMostrarTelaCerto] = useState(false);

  // Captura o ID da fase atual clicada no mapa (padrão 1 se vier vazio)
  const idFase = selectedPonto?.id || 1;
  const nomeFase = selectedPonto?.nome || `FASE ${idFase}: DESAFIO DO ANIMUS`;

  // =========================================================================
  // BANCO DE DADOS DE PERGUNTAS SEPARADAS POR FASE
  // =========================================================================
  const bancoPerguntas = {
    1: {
      pergunta: "Quem é o protagonista da trilogia clássica baseada na Itália renascentista?",
      alternativaCorreta: "B",
      alternativas: [
        { id: "A", texto: "Altaïr Ibn-La'Ahad" },
        { id: "B", texto: "Ezio Auditore da Firenze" },
        { id: "C", texto: "Connor Kenway" },
        { id: "D", texto: "Edward Kenway" },
        { id: "E", texto: "Desmond Miles" }
      ]
    },
    2: {
      pergunta: "Qual é o nome da arma icônica oculta utilizada pela Ordem dos Assassinos?",
      alternativaCorreta: "C",
      alternativas: [
        { id: "A", texto: "Besta de Pulso" },
        { id: "B", texto: "Adaga Damasquina" },
        { id: "C", texto: "Lâmina Oculta (Hidden Blade)" },
        { id: "D", texto: "Espada de Altaïr" },
        { id: "E", texto: "Dardo de Corda" }
      ]
    },
    3: {
      pergunta: "Qual é o nome do poderoso artefato tecnológico deixado pela Primeira Civilização (Isso)?",
      alternativaCorreta: "A",
      alternativas: [
        { id: "A", texto: "Maçã do Éden" },
        { id: "B", texto: "Cálice Sagrado" },
        { id: "C", texto: "Olho de Deus" },
        { id: "D", texto: "Anel de Eden" },
        { id: "E", texto: "Manto da Sincronização" }
      ]
    }
  };

  // Carrega os dados da fase atual ou usa a fase 1 como segurança
  const dadosAtuais = bancoPerguntas[idFase] || bancoPerguntas[1];

  const validarResposta = (e) => {
    e.preventDefault();

    if (!opcaoSelecionada) {
      alert("Por favor, selecione uma alternativa antes de enviar!");
      return;
    }

    if (opcaoSelecionada === dadosAtuais.alternativaCorreta) {
      setMostrarTelaCerto(true);

      setTimeout(() => {
        setMostrarTelaCerto(false);
        // Salva o acerto com o texto esperado pelo validador do mapa
        adicionarAcerto(`Fase ${idFase} coletada`);
        setOpcaoSelecionada(null);
        setTelaAtiva('mapa'); 
      }, 2000);

    } else {
      const totalErros = tentativasErradas + 1;
      setTentativasErradas(totalErros);
      
      adicionarErro(`Falha na Fase ${idFase}`);
      setMostrarTelaErro(true);

      setTimeout(() => {
        setMostrarTelaErro(false); 

        if (totalErros >= 2) {
          alert("Sincronização Falhou! Você atingiu o limite de 2 erros. Voltando ao mapa.");
          setTentativasErradas(0);
          setOpcaoSelecionada(null);
          setTelaAtiva('mapa'); 
        } else {
          alert("Resposta incorreta! O Animus detectou dessincronização. Você tem mais 1 tentativa.");
        }
      }, 2000);
    }
  };

  if (mostrarTelaCerto) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#121315]">
        <img src={imagemCerto} alt="Sucesso" className="w-40 h-40 object-contain mb-6 drop-shadow-[0_0_20px_rgba(92,184,92,0.6)]" />
        <h2 className="text-2xl font-black uppercase tracking-[0.3em] font-serif text-[#dfd5bd]">SINCRONIZADO</h2>
        <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Sequência de DNA carregada com sucesso</p>
      </div>
    );
  }

  if (mostrarTelaErro) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#121315] text-[#ff3b3b] animate-pulse">
        <img src={imagemErrado} alt="Erro" className="w-40 h-40 object-contain mb-6 drop-shadow-[0_0_20px_rgba(255,59,59,0.6)]" />
        <h2 className="text-2xl font-black uppercase tracking-[0.3em] font-serif">DESSINCRONIZADO</h2>
        <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Tentativa incorreta registrada no sistema</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-[#121315] text-[#dfd5bd] p-6 select-none">
      
      <h2 className="text-xl font-bold text-[#ff3b3b] uppercase tracking-[0.2em] mb-4 font-serif">
        {nomeFase}
      </h2>

      <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">
        Erros nesta fase: <span className="text-[#ff3b3b] font-bold">{tentativasErradas}</span> de 2
      </p>

      <div className="w-full max-w-xl bg-black/50 border border-[#403f3d] p-8 rounded-2xl text-center mb-8 shadow-2xl backdrop-blur-md">
        <p className="text-base text-white tracking-wide leading-relaxed">
          {dadosAtuais.pergunta}
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3 mb-8">
        {dadosAtuais.alternativas.map((alt) => {
          const estaSelecionada = opcaoSelecionada === alt.id;
          return (
            <button
              key={alt.id}
              onClick={() => setOpcaoSelecionada(alt.id)}
              className={`w-full text-left px-5 py-3.5 rounded-xl border text-sm tracking-wide transition duration-200 cursor-pointer flex items-center gap-4 ${
                estaSelecionada 
                  ? 'bg-[#ff3b3b]/20 border-[#ff3b3b] text-white font-bold shadow-[0_0_15px_rgba(255,59,59,0.2)]' 
                  : 'bg-[#161719] border-[#403f3d] hover:border-[#ff3b3b]/60 text-[#dfd5bd]'
              }`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                estaSelecionada ? 'bg-[#ff3b3b] text-white' : 'bg-[#121315] border border-[#403f3d] text-[#ff3b3b]'
              }`}>
                {alt.id}
              </span>
              <span>{alt.texto}</span>
            </button>
          );
        })}
      </div>

      <button 
        onClick={validarResposta}
        className="w-full max-w-md bg-[#ff3b3b] hover:bg-[#d62828] text-white font-bold uppercase tracking-[0.2em] py-4 rounded-xl text-xs transition duration-200 shadow-[0_4px_25px_rgba(255,59,59,0.3)] cursor-pointer"
      >
        Sincronizar Resposta
      </button>

    </div>
  );
}
