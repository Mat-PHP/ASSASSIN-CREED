import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Se você instalou o framer-motion

export default function Conclusao() {
  const { limparProgresso } = useContext(GameContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-black text-white">
      <div className="text-8xl mb-6 animate-pulse">🗡️</div>
      
      <h1 className="text-4xl font-black mb-4 tracking-tighter text-red-400">
        VERDADE REVELADA
      </h1>
      
      <p className="text-lg mb-10 text-gray-200 max-w-xs">
        A Irmandade recuperou os fragmentos e o segredo do Animus foi restaurado. O futuro está seguro.
      </p>
      
      <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mb-10 backdrop-blur-md">
        <p className="text-xs uppercase font-bold tracking-widest text-gray-300 mb-2">Verdade Final:</p>
        <p className="italic font-serif text-xl text-red-400">
          "OS ASSASSINOS PROTEGEM O FUTURO SEGREDO"
        </p>
      </div>

      <Link 
        to="/" 
        onClick={limparProgresso}
        className="bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-full font-black text-lg shadow-[0_10px_20px_rgba(255,0,0,0.2)] transition-all active:scale-95"
      >
        REINICIAR A MISSÃO
      </Link>

      <p className="mt-8 text-[10px] opacity-50 uppercase tracking-widest">
        Projeto Front-End adaptado para Assassin's Creed
      </p>
    </div>
  );
}