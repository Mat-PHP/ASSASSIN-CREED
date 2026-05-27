export default function Home({ setTelaAtiva }) {
  return (
    <div className="relative min-h-[85vh] w-full text-white flex flex-col items-center justify-center px-4 py-8">
      
      {/* Background Gradients internos da área de conteúdo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.12),transparent_40%)] pointer-events-none" />
      
      {/* Conteúdo Centralizado */}
      <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center gap-10">
        
        {/* Título Principal */}
        <div>
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl uppercase">
            ASSASSIN'S CREED
            <span className="block text-red-600 mt-2 tracking-wide">IRMANDADE</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Entre no Animus e recupere os fragmentos que protegem o futuro. Sua missão começa agora, na penumbra da Irmandade.
          </p>
        </div>

        {/* Botão JOGAR que muda o estado direto no App.jsx */}
        <div className="mt-2">
          <button
            onClick={() => setTelaAtiva('mapa')}
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-20 py-4 text-lg font-black uppercase tracking-[0.25em] text-white shadow-[0_0_50px_rgba(220,38,38,0.4)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_70px_rgba(220,38,38,0.6)] hover:scale-105 cursor-pointer"
          >
            JOGAR
          </button>
        </div>

      </div>
    </div>
  );
}
