import React, { useState } from 'react';
import './Jogo.css'; // Importa a folha de estilo separada com o nome correto do arquivo

// Importa as suas imagens locais de sucesso e falha
import imagemCerto from '../assets/Certo.png';
import imagemErrado from '../assets/ERRADO.png';

export default function Jogo({ selectedPonto, setTelaAtiva, adicionarAcerto, adicionarErro }) {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [tentativasErradas, setTentativasErradas] = useState(0);
  
  const [mostrarTelaErro, setMostrarTelaErro] = useState(false);
  const [mostrarTelaCerto, setMostrarTelaCerto] = useState(false);

  // Identifica qual fase o jogador clicou no mapa
  const idFase = selectedPonto?.id || 1;
  const nomeFase = selectedPonto?.nome || `FASE ${idFase}: DESAFIO DO ANIMUS`;

  // BANCO DE DADOS ATUALIZADO PARA AS 5 FASES DO SENAI
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
    },
    4: {
      pergunta: "Qual era a profissão pirata de Edward Kenway antes de se juntar formalmente à Irmandade?",
      alternativaCorreta: "D",
      alternativas: [
        { id: "A", texto: "Navegador de Frota" },
        { id: "B", texto: "Comerciante de Especiarias" },
        { id: "C", texto: "Caçador de Recompensas" },
        { id: "D", texto: "Corsário / Capitão Pirata" },
        { id: "E", texto: "Almirante da Coroa" }
      ]
    },
    5: {
      pergunta: "Qual é o nome da máquina de reality virtual que permite ler as memórias genéticas dos ancestrais?",
      alternativaCorreta: "E",
      alternativas: [
        { id: "A", texto: "Helix" },
        { id: "B", texto: "Abstergo Core" },
        { id: "C", texto: "Sentinel" },
        { id: "D", texto: "Nexus" },
        { id: "E", texto: "Animus" }
      ]
    }
  };

  const dadosAtuais = bancoPerguntas[idFase] || bancoPerguntas;

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
        adicionarAcerto(`Fase ${idFase} coletada`);
        setOpcaoSelecionada(null);
        setTelaAtiva('mapa'); 
      }, 500); // 500ms para pular rápido para o mapa!

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

  // TELA DE ACERTO AUTOMÁTICO (CHAMA AS CLASSES DO SEU JOGO.CSS)
  if (mostrarTelaCerto) {
    return (
      <div className="quiz-container feedback-sucesso">
        <img src={imagemCerto} alt="Sucesso" className="feedback-imagem" />
        <h2 className="feedback-titulo font-serif">SINCRONIZADO</h2>
        <p className="feedback-subtitulo uppercase tracking-widest">Sequência de DNA carregada</p>
      </div>
    );
  }

  // TELA DE ERRO AUTOMÁTICO (CHAMA AS CLASSES DO SEU JOGO.CSS)
  if (mostrarTelaErro) {
    return (
      <div className="quiz-container feedback-erro status-pulse">
        <img src={imagemErrado} alt="Erro" className="feedback-imagem" />
        <h2 className="feedback-titulo-erro font-serif">DESSINCRONIZADO</h2>
        <p className="feedback-subtitulo uppercase tracking-widest">Tentativa incorreta registrada</p>
      </div>
    );
  }

  return (
    <div className="quiz-container select-none">
      
      <h2 className="quiz-fase-titulo font-serif uppercase tracking-widest">
        {nomeFase}
      </h2>

      <p className="quiz-contador uppercase tracking-widest">
        Erros nesta fase: <span className="contador-destaque">{tentativasErradas}</span> de 2
      </p>

      <div className="quiz-pergunta-card shadow-2xl">
        <p className="quiz-pergunta-texto tracking-wide">
          {dadosAtuais.pergunta}
        </p>
      </div>

      <div className="quiz-alternativas-lista">
        {dadosAtuais.alternativas.map((alt) => {
          const estaSelecionada = opcaoSelecionada === alt.id;
          return (
            <button
              key={alt.id}
              onClick={() => setOpcaoSelecionada(alt.id)}
              className={`quiz-alternativa-btn ${estaSelecionada ? 'btn-selecionado shadow-lg' : 'btn-padrao'}`}
            >
              <span className={`alternativa-letra-circulo ${estaSelecionada ? 'letra-selecionada' : 'letra-padrao'}`}>
                {alt.id}
              </span>
              <span className="alternativa-texto">{alt.texto}</span>
            </button>
          );
        })}
      </div>

      <button 
        onClick={validarResposta}
        className="quiz-enviar-btn font-bold uppercase tracking-widest shadow-lg"
      >
        Sincronizar Resposta
      </button>

    </div>
  );
}
