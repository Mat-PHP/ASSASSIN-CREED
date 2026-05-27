import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortablePista({ id, texto }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

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
      className="bg-black/80 p-4 mb-3 rounded-3xl shadow-xl border-2 border-red-700 cursor-grab active:cursor-grabbing flex items-center touch-none hover:border-red-400 transition-colors"
      aria-label={`Fragmento: ${texto}. Use as setas para reordenar.`}
    >
      <span className="mr-4 text-red-400">🗡️</span>
      <span className="font-bold text-red-200">{texto}</span>
    </div>
  );
}