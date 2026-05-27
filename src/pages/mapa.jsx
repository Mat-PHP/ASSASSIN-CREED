import { useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { pontosDeInteresse } from '../data/pontos';
import { GameContext } from '../context/GameContext';
import { calcularDistancia } from '../hooks/useGeolocation';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Definição correta do ícone para o Leaflet renderizar no Vite
let AnimusIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

function CliqueParaCaminhar({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    },
  });
  return null;
}

export default function Mapa({ setTelaAtiva, setSelectedPonto }) {
  const { progresso } = useContext(GameContext);
  const [position, setPosition] = useState({ lat: -22.9038, lng: -47.0588 });

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#121315]">
      
      {/* HUD Superior */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-xs px-4">
        <div className="bg-[#1a0a0a]/90 backdrop-blur-md border border-[#542222] p-3 rounded shadow-xl text-center">
            <h2 className="text-[#dfd5bd] font-serif font-bold text-xs uppercase tracking-[0.2em]">Sincronização de Mapa</h2>
            <p className="text-[9px] text-[#ff3b3b] font-mono uppercase mt-0.5 tracking-wider animate-pulse">Fases Liberadas no Setor</p>
        </div>
      </div>

      {/* Filtro Estilo Animus */}
      <div className="w-full h-full filter invert-[0.95] hue-rotate-[190deg] saturate-[0.3] brightness-[0.7]">
        <MapContainer 
          center={[position.lat, position.lng]} 
          zoom={16} 
          className="h-full w-full z-10"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />

          <CliqueParaCaminhar setPosition={setPosition} />

          {/* Círculo do Jogador */}
          <Circle 
            center={[position.lat, position.lng]} 
            radius={30} 
            pathOptions={{ color: '#a81c1c', fillColor: '#a81c1c', fillOpacity: 0.15, weight: 1 }} 
          />
          <Circle 
            center={[position.lat, position.lng]} 
            radius={6} 
            pathOptions={{ color: '#dfd5bd', fillColor: '#a81c1c', fillOpacity: 1, weight: 2 }} 
          />

          {/* Renderização dos Marcadores */}
          {pontosDeInteresse && pontosDeInteresse.map((ponto) => {
            const dist = calcularDistancia(position.lat, position.lng, ponto.lat, ponto.lng);
            const jaResolvido = progresso?.pontosResolvidos?.includes(ponto.id) || false;
            
            // Exibe qualquer fase que esteja a menos de 2000m
            if (dist > 2000 && !jaResolvido) return null;

            return (
              <Marker key={ponto.id} position={[ponto.lat, ponto.lng]} icon={AnimusIcon}>
                <Popup>
                  <div className="text-center p-1 min-w-[130px]">
                    <h3 className="font-bold text-sm text-gray-900 border-b pb-1 mb-1">{ponto.nome}</h3>
                    <p className="text-[10px] text-gray-600 mb-2">Distância: {Math.round(dist)}m</p>
                    
                    {/* Valida a distância do marcador */}
                    {dist < 1000 || jaResolvido ? (
                      <button 
                        onClick={() => {
                          setSelectedPonto(ponto);
                          setTelaAtiva('quiz'); // CORREÇÃO: Altera de 'jogo' para 'quiz'
                        }}
                        className="w-full bg-red-700 hover:bg-red-800 text-white py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                      >
                        {jaResolvido ? "Rever Pista" : "Desafiar Guardião"}
                      </button>
                    ) : (
                      <div className="p-1 bg-red-50 rounded border border-red-200">
                          <p className="text-red-600 text-[9px] font-bold uppercase">Muito Longe!</p>
                          <p className="text-gray-500 text-[8px]">Aproxime-se mais {Math.round(dist - 1000)}m</p>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="absolute bottom-6 right-4 z-[1000] bg-[#121315]/95 border border-zinc-800 px-3 py-1.5 rounded font-mono text-[9px] text-[#dfd5bd] tracking-widest shadow-2xl">
        <span className="text-[#ff3b3b]">LAT:</span> {position.lat.toFixed(4)} | <span className="text-[#ff3b3b]">LNG:</span> {position.lng.toFixed(4)}
      </div>
    </div>
  );
}
