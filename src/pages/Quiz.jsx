import React, { useState } from 'react';
import './Quiz.css'; // Importa o arquivo de estilos separado do Quiz

// Importa as imagens que mostram feedback de acerto e erro
import imagemCerto from '../assets/Certo.png';
import imagemErrado from '../assets/ERRADO.png';

export default function Quiz({ selectedPonto, setTelaAtiva, adicionarAcerto, adicionarErro }) {
  // Estado da alternativa escolhida pelo jogador
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);

  // Contador de erros nesta fase específica
  const [tentativasErradas, setTentativasErradas] = useState(0);
  const [mostrarTelaErro, setMostrarTelaErro] = useState(false);
  const [mostrarTelaCerto, setMostrarTelaCerto] = useState(false);

  // Uso o ponto selecionado no mapa para saber em qual fase estamos.
  const idFase = selectedPonto?.id || 1;
  const nomeFase = selectedPonto?.nome || `FASE ${idFase}: DESAFIO DO ANIMUS`;

  // Banco de perguntas para cada fase do quiz.
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
      pergunta: "Qual é o nome da máquina de realidade virtual que permite ler as memórias genéticas dos ancestrais?",
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

  // Pega os dados corretos para a fase atual, ou o banco inteiro se falhar.
  const dadosAtuais = bancoPerguntas[idFase] || bancoPerguntas;

  const validarResposta = (e) => {
    e.preventDefault();

    // Se não escolheu opção, aviso o usuário.
    if (!opcaoSelecionada) {
      alert("Por favor, selecione uma alternativa antes de enviar!");
      return;
    }

    if (opcaoSelecionada === dadosAtuais.alternativaCorreta) {
      // Acerto: mostra feedback e volta para o mapa.
      setMostrarTelaCerto(true);

      setTimeout(() => {
        setMostrarTelaCerto(false);
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

  // Se estiver exibindo o feedback de acerto, retorno apenas esse layout.
  if (mostrarTelaCerto) {
    return (
      <div className="quiz-container feedback-sucesso">
        <img src={imagemCerto} alt="Sucesso" className="feedback-imagem" />
        <h2 className="feedback-titulo font-serif">SINCRONIZADO</h2>
        <p className="feedback-subtitulo uppercase tracking-widest">Sequência de DNA carregada com sucesso</p>
      </div>
    );
  }

  // Se estiver exibindo o feedback de erro, retorno apenas esse layout.
  if (mostrarTelaErro) {
    return (
      <div className="quiz-container feedback-erro status-pulse">
        <img src={imagemErrado} alt="Erro" className="feedback-imagem" />
        <h2 className="feedback-titulo-erro font-serif">DESSINCRONIZADO</h2>
        <p className="feedback-subtitulo uppercase tracking-widest">Tentativa incorreta registrada no sistema</p>
      </div>
    );
  }

  // Layout principal do quiz com pergunta e alternativas.
  return (
    <div className="quiz-container select-none">
      <h2 className="quiz-fase-titulo font-serif uppercase tracking-widest">{nomeFase}</h2>
      <p className="quiz-contador uppercase tracking-widest">
        Erros nesta fase: <span className="contador-destaque">{tentativasErradas}</span> de 2
      </p>
      <div className="quiz-pergunta-card shadow-2xl">
        <p className="quiz-pergunta-texto tracking-wide">{dadosAtuais.pergunta}</p>
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

      <button onClick={validarResposta} className="quiz-enviar-btn font-bold uppercase tracking-widest shadow-lg">
        Sincronizar Resposta
      </button>
    </div>
  );
}
