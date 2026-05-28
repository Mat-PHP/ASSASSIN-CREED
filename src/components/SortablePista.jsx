import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortablePista({ id, texto }) {
  /* 
     Desestruturei o hook useSortable para injetar o comportamento de arrastar.
     Passei o ID único de cada fragmento para o dnd-kit conseguir rastreá-lo.
  */
  const {
    attributes,   // Atributos de acessibilidade (como o papel de leitor de tela)
    listeners,    // Eventos de clique, touch e teclado para iniciar o arrasto
    setNodeRef,   // Referência que avisa ao dnd-kit qual elemento DOM representa este bloco
    transform,    // Dados de deslocamento X e Y durante o movimento do arrasto
    transition,   // Efeito de transição suave quando o bloco volta ou troca de posição
  } = useSortable({ id: id });

  // Converto os dados de transformação do dnd-kit em uma string CSS válida para o estilo em linha
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      /* 
         Adicionei estilos táteis e visuais (cursor-grab, touch-none) para o arrasto 
         funcionar perfeitamente tanto no mouse quanto em telas touch de celulares.
      */
      className="bg-black/80 p-4 mb-3 rounded-3xl shadow-xl border-2 border-red-700 cursor-grab active:cursor-grabbing flex items-center touch-none hover:border-red-400 transition-colors"
      /* Configurei o aria-label para leitores de tela explicarem como mover o fragmento pelo teclado */
      aria-label={`Fragmento: ${texto}. Use as setas para reordenar.`}
    >
      <span className="mr-4 text-red-400">🗡️</span>
      <span className="font-bold text-red-200">{texto}</span>
    </div>
  );
}
