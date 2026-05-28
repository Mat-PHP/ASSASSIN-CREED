import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortablePista({ id, texto }) {

  // Aqui eu estou “ativando” o drag and drop nesse item
  // O dnd-kit precisa de um ID único pra saber qual peça ele está movendo
  const {
    attributes,   // coisas de acessibilidade (ajuda teclado e leitor de tela)
    listeners,    // eventos de arrastar (mouse, touch, teclado)
    setNodeRef,   // liga esse componente ao elemento real do HTML
    transform,    // posição enquanto o item está sendo arrastado
    transition,   // animação suave quando ele muda de lugar
  } = useSortable({ id: id });

  // Aqui eu converto o movimento em CSS de verdade
  // pra conseguir ver o item sendo arrastado na tela
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div

      // conecta esse bloco com o sistema de drag and drop
      ref={setNodeRef}

      // aplica a movimentação visual
      style={style}

      // isso aqui deixa o item “arrastável”
      {...attributes}
      {...listeners}

      // estilo visual do fragmento na tela
      className="
        bg-black/80
        p-4
        mb-3
        rounded-3xl
        shadow-xl
        border-2
        border-red-700
        cursor-grab
        active:cursor-grabbing
        flex
        items-center
        touch-none
        hover:border-red-400
        transition-colors
      "

      // ajuda leitores de tela a entender o que é esse item
      aria-label={`Fragmento: ${texto}. Use as setas para reordenar.`}
    >

      {/* ícone só pra dar estilo visual */}
      <span className="mr-4 text-red-400">
        🗡️
      </span>

      {/* texto da pista que o jogador vai organizar */}
      <span className="font-bold text-red-200">
        {texto}
      </span>

    </div>
  );
}
}
