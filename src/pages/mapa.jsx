import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';

// Importa todas as suas imagens locais de controle
import imagemCadeado from '../assets/Cadeado.png';
import imagemErrado from '../assets/ERRADO.png';
import imagemCerto from '../assets/Certo.png'; 

// CONFIGURAÇÃO DOS ÍCONES EM PIXELS
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

// LISTA DE FASES NO SENAI SÃO BERNARDO
const PONTOS_REAIS_SENAI = [
  { id: 1, nome: "FASE 1: SINCRONIZAÇÃO DE MAPAS", lat: -22.9208, lng: -47.0875 },
  { id: 2, nome: "FASE 2: A REDE DA IRMANDADE", lat: -22.9195, lng: -47.0860 },
  { id: 3, nome: "FASE 3: FRAGMENTO DE EDEN", lat: -22.9180, lng: -47.0845 }
];

export default function Mapa({ setTelaAtiva, setSelectedPonto, faseAtual }) {
  
  const handleIniciarFase = (ponto) => {
    setSelectedPonto(ponto);
    setTelaAtiva('quiz');
  };

  const centroSenaiSaoBernardo = [-22.9208, -47.0875];

  const historicoPistas = (() => {
    const salvas = localStorage.getItem('animus_pistas');
    return salvas ? JSON.parse(salvas) : [];
  })();

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative' }}>
      
      {/* HUD Superior */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#1c1b1a]/95 border border-[#ff3b3b]/40 text-[#dfd5bd] px-6 py-2 rounded shadow-2xl backdrop-blur-sm text-center min-w-[200px] pointer-events-none">
        <p className="text-[10px] uppercase tracking-widest text-[#ff3b3b] font-bold">Sincronização do Animus</p>
        <p className="text-sm font-semibold mt-0.5">Sequência Atual: {faseAtual || 1}</p>
      </div>

      <div style={{ width: '100%', height: '100vh', position: 'relative', zIndex: 10 }}>
        <MapContainer center={centroSenaiSaoBernardo} zoom={16} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {PONTOS_REAIS_SENAI.map((ponto) => {
            const idFase = ponto.id;
            const estaBloqueado = idFase > (faseAtual || 1);

            const jaAcertouEstaFase = (faseAtual || 1) > idFase || historicoPistas.some(pista => 
              pista.texto && pista.texto.includes(`Fase ${idFase} coletada`)
            );

            const errouEstaFase = !jaAcertouEstaFase && historicoPistas.some(pista => 
              pista.texto && (pista.texto.includes(`Falha na Fase ${idFase}`) || pista.texto.includes(`Fase ${idFase}`))
            );

            let iconeFinal = new L.Icon.Default(); 
            if (estaBloqueado) iconeFinal = iconeCadeadoPersonalizado; 
            else if (jaAcertouEstaFase) iconeFinal = iconeCertoPersonalizado; 
            else if (errouEstaFase) iconeFinal = iconeErradoPersonalizado; 

            return (
              <Marker key={idFase} position={[ponto.lat, ponto.lng]} icon={iconeFinal}>
                <Popup>
                  <div className="p-2 text-center font-sans bg-[#161719] text-[#dfd5bd] rounded min-w-[160px]">
                    <h3 className="text-sm font-bold text-[#ff3b3b] mb-3">{ponto.nome}</h3>

                    {/* TEXTO REMOVIDO DAQUI */}

                    {estaBloqueado ? (
                      <div className="flex items-center justify-center gap-1.5 text-[#ff3b3b] font-bold text-xs uppercase bg-[#ff3b3b]/10 py-1.5 px-3 rounded border border-[#ff3b3b]/30 select-none">
                        <span>Bloqueado</span>
                      </div>
                    ) : jaAcertouEstaFase ? (
                      <div className="text-[#5cb85c] font-bold text-xs uppercase bg-[#5cb85c]/10 py-1.5 px-3 rounded border border-[#5cb85c]/20 select-none">
                        ✓ Sincronizado
                      </div>
                    ) : errouEstaFase ? (
                      <div className="flex flex-col gap-2">
                        <div className="text-[#ff3b3b] font-bold text-xs uppercase bg-[#ff3b3b]/10 py-1 px-2 rounded border border-[#ff3b3b]/20">
                          Sincronização Falhou
                        </div>
                        <button
                          onClick={() => handleIniciarFase(ponto)}
                          className="w-full bg-[#ff3b3b] text-white hover:bg-[#d62828] transition duration-200 py-1.5 rounded text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Tentar Novamente
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleIniciarFase(ponto)}
                        className="w-full bg-[#1c1b1a] text-[#dfd5bd] hover:bg-[#ff3b3b] hover:text-white border border-[#403f3d] hover:border-[#ff3b3b] transition duration-200 py-1.5 px-3 rounded text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
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
