import { Link } from 'react-router-dom';

// Meus dados estáticos dos capítulos organizados em um array para facilitar o map
const chapters = [
  {
    id: 'cap1',
    title: 'Capítulo 1',
    subtitle: 'O Eco da Catedral',
    description: 'A Iniciação na sombra: entre no Animus e descubra o primeiro fragmento do códice.',
  },
  {
    id: 'cap2',
    title: 'Capítulo 2',
    subtitle: 'Beco da Vigília',
    description: 'Escolha sua rota e evade os guardas em um duelo de furtividade e astúcia.',
  },
  {
    id: 'cap3',
    title: 'Capítulo 3',
    subtitle: 'Torre da Relíquia',
    description: 'O clímax da missão: assalte a torre, recue nas sombras e recupere a relíquia ancestral.',
  },
];

export default function Capitulos() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060b] text-white">
      {/* Criei um fundo com gradientes radiais suaves simulando as luzes e atmosfera do Animus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.16),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.08),transparent_25%)] pointer-events-none" />
      
      <div className="relative z-10 px-6 py-10 lg:px-12">
        {/* Meu card principal de cabeçalho com efeito translúcido (backdrop-blur) */}
        <div className="mx-auto mb-10 max-w-5xl rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-red-400">SELEÇÃO DE CAPÍTULO</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Escolha sua próxima memória</h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">Cada capítulo revela uma nova parte da história. Selecione um capítulo para entrar no Animus e avançar na narrativa.</p>
          
          {/* Botões de ação rápida para navegação global do jogo */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-red-500 hover:bg-red-500/10"
            >
              VOLTAR AO MENU
            </Link>
            <Link
              to="/jogo"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl transition hover:bg-red-500"
            >
              INICIAR MODO NOVEL
            </Link>
          </div>
        </div>

        {/* Grid responsivo: 1 coluna no mobile, 2 em tablets (sm) e 3 em telas grandes (xl) */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {/* Faço um map no meu array de capítulos para renderizar cada card dinamicamente */}
          {chapters.map((chapter, index) => (
            <article 
              key={chapter.id} 
              className="group rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl transition hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/10"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{chapter.title}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{chapter.subtitle}</h2>
                </div>
                {/* Exibo o número do capítulo dinamicamente baseado no index do array */}
                <span className="rounded-full bg-red-500/15 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-red-200">CAP {index + 1}</span>
              </div>
              
              <p className="mt-5 text-sm leading-6 text-slate-300">{chapter.description}</p>
              
              {/* Seção informativa de dificuldade do capítulo */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Dificuldade</span>
                <span className="rounded-full bg-slate-700/70 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-200">Médio</span>
              </div>
              
              {/* Botão para de fato carregar a memória selecionada */}
              <Link
                to="/jogo"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-600/20"
              >
                INICIAR CAPÍTULO
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
