import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import './mapa.css'; // Importa o arquivo de estilos separado do mapa

// Importa todas as suas imagens locais de controle
import imagemCadeado from '../assets/Cadeado.png';
import imagemErrado from '../assets/ERRADO.png';
import imagemCerto from '../assets/Certo.png'; 

// CONFIGURAÇÃO DOS TAMANHOS DOS ÍCONES USANDO CLASSES DO CSS SEPARADO
const iconeCadeadoPersonalizado = L.icon({
  iconUrl: imagemCadeado,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -32]
});

const iconeErradoPersonalizado = L.icon({
  iconUrl: imagemErrado,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -32]
});

const iconeCertoPersonalizado = L.icon({
  iconUrl: imagemCerto,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -32]
});

const PONTOS_REAIS_SENAI = [
  { id: 1, nome: "FASE 1: SINCRONIZAÇÃO DE MAPAS", lat: -22.92135, lng: -47.08745 },
  { id: 2, nome: "FASE 2: A REDE DA IRMANDADE",   lat: -22.92000, lng: -47.08620 },
  { id: 3, nome: "FASE 3: FRAGMENTO DE EDEN",     lat: -22.92150, lng: -47.08450 },
  { id: 4, nome: "FASE 4: CODIFICAÇÃO DO ANIMUS", lat: -22.91900, lng: -47.08850 },
  { id: 5, nome: "FASE 5: CONFRONTO FINAL",       lat: -22.92250, lng: -47.08950 }
];

export default function Mapa({ setTelaAtiva, setSelectedPonto, faseAtual }) {
  
  const handleIniciarFase = (ponto) => {
    setSelectedPonto(ponto);
    setTelaAtiva('quiz');
  };

  const sequenciaAtual = faseAtual || 1;
  const centroDoMapa = [-22.92135, -47.08745];

  const historicoPistas = (() => {
    const salvas = localStorage.getItem('animus_pistas');
    return salvas ? JSON.parse(salvas) : [];
  })();

  return (
    <div className="mapa-pagina-container">
      
      {/* HUD Superior de Progresso usando CSS separado */}
      <div className="animus-hud shadow-2xl">
        <p className="hud-subtitulo font-bold">Sincronização do Animus</p>
        <p className="hud-titulo font-semibold">Sequência Atual: {sequenciaAtual}</p>
      </div>

      {/* Janela do Leaflet */}
      <div className="mapa-wrapper">
        <MapContainer center={centroDoMapa} zoom={16} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {PONTOS_REAIS_SENAI.map((ponto) => {
            const idFase = ponto.id;
            const estaBloqueado = idFase > sequenciaAtual;

            const jaAcertouEstaFase = sequenciaAtual > idFase || historicoPistas.some(pista => 
              pista.texto && pista.texto.includes(`Fase ${idFase} coletada`)
            );

            const errouEstaFase = !jaAcertouEstaFase && historicoPistas.some(pista => 
              pista.texto && (pista.texto.includes(`Falha na Fase ${idFase}`) || pista.texto.includes(`Fase ${idFase}`))
            );

            let iconeFinal = new L.Icon.Default(); 
            if (estaBloqueado) iconeFinal = iconeCadeadoPersonalizado; 
            else if (jaAcertouEstaFase) iconeFinal = iconeCertoPersonalizado; 
            else if (errouEstaFase) iconeFinal = iconeErradoPersonalizado; 

            const pesoVisual = (idFase === sequenciaAtual) ? 5000 : 0;

            return (
              <Marker key={idFase} position={[ponto.lat, ponto.lng]} icon={iconeFinal} zIndexOffset={pesoVisual}>
                <Popup>
                  <div className="popup-balao font-sans">
                    <h3 className="popup-titulo font-bold">{ponto.nome}</h3>

                    {estaBloqueado ? (
                      <div className="status-container status-bloqueado font-bold">
                        <span>Bloqueado</span>
                      </div>
                    ) : jaAcertouEstaFase ? (
                      <div className="status-container status-sincronizado font-bold">
                        ✓ Sincronizado
                      </div>
                    ) : errouEstaFase ? (
                      <div className="popup-erro-bloco">
                        <div className="status-container status-falhou font-bold">
                          Sincronização Falhou
                        </div>
                        <button onClick={() => handleIniciarFase(ponto)} className="btn-tentar font-bold uppercase">
                          Tentar Novamente
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleIniciarFase(ponto)} className="btn-jogar font-bold uppercase">
                        Iniciar Sincronização
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

    </div>
  );
}
