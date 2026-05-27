import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { SortablePista } from '../components/SortablePista';

export default function Enigma() {
  const { progresso } = useContext(GameContext);
  const navigate = useNavigate();
  
  // Estado local para a ordem dos fragmentos
  const [items, setItems] = useState([]);

  // Carrega os fragmentos coletados ao entrar na tela
  useEffect(() => {
    if (progresso.pistas) {
      setItems(progresso.pistas);
    }
  }, [progresso.pistas]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const verificarSolucao = () => {
    const solucaoCorreta = ["OS", "ASSASSINOS", "PROTEGEM", "O", "FUTURO", "SEGREDO"];
    
    const estaCorreto = items.every((val, index) => val === solucaoCorreta[index]);

    if (estaCorreto) {
      navigate('/conclusao');
    } else {
      alert("A ordem ainda não está correta! Reúna os fragmentos na ordem da Irmandade.");
    }
  };

  if (items.length < 6) {
    return (
      <div className="p-8 text-center mt-20 text-white bg-slate-950 min-h-screen">
        <h2 className="text-2xl font-bold text-red-400">Memória Trancada</h2>
        <p className="mt-4 text-gray-300">Você recuperou {items.length} de 6 fragmentos. <br/> Continue no mapa para coletar os restantes.</p>
        <button onClick={() => navigate('/mapa')} className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full">Voltar ao Mapa</button>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 bg-slate-950 min-h-screen text-white">
      <h2 className="text-3xl font-black text-red-400 mb-2">Memória do Animus</h2>
      <p className="text-gray-300 mb-8">Arraste os fragmentos para revelar a verdade escondida pela Irmandade.</p>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map(pista => <SortablePista key={pista} id={pista} texto={pista} />)}
        </SortableContext>
      </DndContext>

      <button 
        onClick={verificarSolucao}
        className="w-full mt-8 bg-red-600 text-white font-bold py-4 rounded-2xl shadow-xl active:scale-95 transition-transform"
      >
        CONFIRMAR ORDEM
      </button>
    </div>
  );
}