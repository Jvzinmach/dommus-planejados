import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointer2, MessageSquare, ShieldCheck, Zap, Menu, X, ArrowRight, Clock, MapPin, Send } from 'lucide-react';
import PortfolioPage from './PortfolioPage';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENTES AUXILIARES ---

const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}<span className="inline-block w-2 h-5 bg-accent ml-1 animate-pulse" /></span>;
};

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const rootRef = useRef();
  const cursorRef = useRef(null);

  // Scroll Handler para a Navbar "Ilha Flutuante"
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Preloader Cinematográfico (Abertura de Luxo)
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to("#preloader", {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
              setLoading(false);
              ScrollTrigger.refresh();
            }
          });
        }
      });

      tl.to(".loader-title", {
        opacity: 1,
        letterSpacing: "0.3em",
        duration: 1.5,
        ease: "power3.out",
      })
      .to(".loader-subtitle", {
        opacity: 0.8,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8")
      .to(".loader-bar", {
        xPercent: 100,
        duration: 1.8,
        ease: "power2.inOut"
      }, "0");
    });

    return () => ctx.revert();
  }, []);

  // 2. Cursor Magnético e Interativo (Engenharia Sensorial)
  useEffect(() => {
    if (loading || window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Efeito Hover em botões e links
    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, [role='button'], details, summary, .gallery-item");
      if (target) {
        cursor.classList.add("cursor-expand");
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, [role='button'], details, summary, .gallery-item");
      if (target) {
        cursor.classList.remove("cursor-expand");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [loading]);

  // GSAP Animations Lifecycle (Protocolo Context)
  useEffect(() => {
    // Só cria as animações da Home se a página atual for a Home e se já passou o preloader
    if (currentPage !== 'home' || loading) return;

    let ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from(".hero-up", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5
      });

      // Sticky Stacking Cards (Protocol Section)
      const cards = gsap.utils.toArray('.stacking-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
              gsap.to(card, {
                scale: 1 - self.progress * 0.1,
                opacity: 1 - self.progress * 0.5,
                filter: `blur(${self.progress * 10}px)`,
              });
            }
          });
        }
      });

      // Split Text Philosophy Reveal
      gsap.from(".phil-reveal", {
        scrollTrigger: {
          trigger: ".phil-section",
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out"
      });
    }, rootRef);

    // Pequeno delay para garantir que o DOM e imagens carregaram, forçando o recálculo do ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [currentPage, loading]);

  return (
    <div ref={rootRef} className="selection:bg-accent selection:text-black">
      {/* Cursor Customizado Magnético */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      {/* Preloader Cinematográfico */}
      {loading && (
        <div id="preloader" className="fixed inset-0 bg-[#060e0b] z-[99999] flex flex-col items-center justify-center overflow-hidden">
          <div className="text-center">
            <h1 className="loader-title text-5xl md:text-7xl font-heading font-black tracking-[0.2em] text-white opacity-0 uppercase mb-4">
              DOMUS
            </h1>
            <p className="loader-subtitle text-[9px] font-data tracking-[0.6em] text-accent opacity-0 uppercase">
              Marcenaria de Alto Padrão
            </p>
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden">
            <div className="loader-bar w-full h-full bg-accent -translate-x-full" />
          </div>
        </div>
      )}

      {currentPage === 'portfolio' ? (
        <PortfolioPage onBack={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      ) : (
        <>
          {/* A. NAVBAR - ILHA FLUTUANTE */}
          <nav className={`pill-nav ${scrolled ? 'top-6 w-[90%] md:w-fit' : 'top-10 w-[95%] md:w-3/4 bg-transparent border-transparent'}`}>
            <div className="flex items-center justify-between gap-12 px-2">
              <div className="text-2xl font-heading font-extrabold tracking-tighter text-white">
                DOMUS<span className="text-accent">.</span>
              </div>
              
              <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-neutral-400">
                {['PROJETOS', 'FILOSOFIA', 'PROCESSO', 'CONTATO'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors">
                    {item}
                  </a>
                ))}
                <button 
                  onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0, 0); }}
                  className="text-accent hover:text-white transition-colors font-bold tracking-widest border-l border-white/10 pl-6"
                >
                  PORTFÓLIO
                </button>
              </div>

              <a href="https://wa.me/5527999871797?text=Ol%C3%A1!%20Acessei%20o%20site%20da%20*DOMUS*%20e%20gostaria%20de%20agendar%20uma%20consultoria%20exclusiva.%20Tenho%20interesse%20em%20marcenaria%20de%20alto%20padr%C3%A3o%20para%20o%20meu%20ambiente." className="group relative overflow-hidden bg-accent text-black font-bold text-xs tracking-widest px-6 py-3 rounded-full transition-transform active:scale-95">
                <span className="relative z-10">ORÇAMENTO</span>
                <div className="absolute inset-x-0 bottom-0 h-0 bg-white transition-all duration-300 group-hover:h-full" />
              </a>
            </div>
          </nav>

      {/* B. HERO SECTION - A CENA DE ABERTURA */}
      <section id="hero-master" className="relative h-[100dvh] flex items-end p-8 md:p-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video 
            id="hero-video"
            src="/0424.mp4" 
            className="w-full h-full object-cover" 
            autoPlay muted playsInline preload="auto"
          />
          {/* Gradiente suave apenas na base para dar legibilidade ao texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="hero-up flex items-center gap-3 text-accent text-xs font-bold tracking-[0.4em] mb-6 uppercase">
            <div className="w-12 h-[1px] bg-accent" />
            Precisão Industrial & Arte
          </div>
          <h1 className="hero-up text-6xl md:text-[8rem] font-heading font-black leading-[0.85] tracking-tighter mb-4 text-white">
            ENGENHARIA<br />
            <span className="text-drama text-[5rem] md:text-[10rem] font-light leading-none -mt-4 block lowercase">sensorial.</span>
          </h1>
          <p className="hero-up text-lg md:text-xl text-neutral-300 max-w-xl mb-10 font-light leading-relaxed">
            Mobiliário de alto padrão que desafia a visão e abraça o tato. Criamos refúgios onde cada milímetro é planejado com obsessão técnica.
          </p>
          <div className="hero-up flex items-center gap-4">
            <button className="bg-accent text-black px-10 py-5 rounded-full font-bold text-sm tracking-widest hover:scale-[1.03] transition-transform">
              EXPLORAR UNIVERSO
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-4 group">
           <div className="w-[1px] h-20 bg-neutral-800 relative overflow-hidden">
              <div className="absolute top-0 w-full h-full bg-accent -translate-y-full animate-bounce" style={{animationDuration: '3s'}} />
           </div>
           <span className="rotate-90 origin-left text-[10px] tracking-[0.5em] text-neutral-500 uppercase ml-3">SCROLL</span>
        </div>
      </section>

      {/* C. FEATURES - ARTEFATOS FUNCIONAIS */}
      <section id="projetos" className="py-32 px-5 md:px-20 bg-dark">
        <div className="mb-20">
          <h2 className="text-xs font-bold text-accent tracking-[0.5em] uppercase mb-4">Functional Artifacts</h2>
          <h3 className="text-4xl md:text-6xl font-heading font-bold text-offwhite leading-tight">DETALHES QUE DEFINEM O LUXO.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 - Diagnostic Shuffler (Acabamento) */}
          <div className="glass-card p-8 md:p-10 h-[550px] flex flex-col group overflow-hidden">
            <div className="flex-1 flex flex-col justify-center">
              <div className="relative h-48 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`absolute inset-x-0 bg-neutral-800 border border-white/10 rounded-3xl flex items-center justify-center transition-all duration-700`} 
                       style={{ 
                         transform: `translateY(${i*18}px) scale(${1 - i*0.05})`, 
                         zIndex: 10-i,
                         height: '100%'
                       }}>
                    <span className="text-accent text-[10px] font-data tracking-[0.5em] uppercase opacity-40">LAYER_00{i}</span>
                  </div>
                ))}
              </div>
              <h4 className="text-3xl font-heading font-bold text-offwhite mb-4">Acabamento Italiano</h4>
              <p className="text-neutral-500 text-base leading-relaxed">
                Utilizamos lacas com gramatura industrial e texturas que eliminam marcas de digitais, garantindo um toque aveludado único.
              </p>
            </div>
          </div>

          {/* Card 2 - Telemetry Typewriter (Cuidado) - SEM GLASS-CARD PARA CONTRASTE TOTAL */}
          <div className="bg-accent text-black p-8 md:p-10 h-[550px] flex flex-col card-rounded shadow-2xl scale-100 md:scale-105 z-10">
             <div className="flex items-center gap-3 mb-10">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <span className="font-data text-[10px] font-black tracking-[0.4em] uppercase border-b border-black/20">LIVE_TELEMETRY_FEED</span>
             </div>
             <div className="font-data text-base h-48 overflow-hidden leading-relaxed font-bold">
                <Typewriter text="Iniciando calibração cirúrgica... Verificando milimetragem de ferragens... Aplicando selamento obssessivo nos cantos... Domus Protocol 01 ativado. Qualidade validada." delay={40} />
             </div>
             <div className="mt-auto">
                <h4 className="text-4xl font-heading font-black uppercase leading-tight">Cuidado Obsessivo</h4>
                <p className="text-black/80 text-base font-semibold mt-4 leading-relaxed">Nossa equipe trata cada instalação como uma montagem de relojoaria suíça, com rigor técnico absoluto.</p>
             </div>
          </div>

          {/* Card 3 - Protocol Scheduler (Precisão) */}
          <div className="glass-card p-8 md:p-10 h-[550px] flex flex-col group">
             <div className="h-56 border border-white/5 rounded-[2rem] bg-neutral-950 p-6 relative overflow-hidden mb-10 shadow-inner">
                <div className="grid grid-cols-7 gap-2 h-full opacity-10">
                   {Array.from({length: 28}).map((_, i) => (
                     <div key={i} className="aspect-square bg-neutral-800 rounded-sm" />
                   ))}
                </div>
                {/* Simulated AI Cursor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent">
                   <div className="relative animate-pulse">
                      <MousePointer2 size={40} className="rotate-12" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-black" />
                   </div>
                </div>
             </div>
             <h4 className="text-3xl font-heading font-bold text-offwhite mb-4">Precisão Industrial</h4>
             <p className="text-neutral-500 text-base leading-relaxed">
                Maquinário próprio de última geração que garante cortes com margem de erro zero em projetos de alta complexidade.
             </p>
          </div>

        </div>
      </section>

      {/* D. PHILOSOPHY - O MANIFESTO */}
      <section id="filosofia" className="phil-section py-40 bg-neutral-100 text-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <img src="/logo.jpeg" className="w-full h-full object-cover grayscale" alt="texture" />
        </div>
        <div className="relative z-10 px-8 md:px-32 text-center max-w-6xl mx-auto">
          <p className="phil-reveal text-sm font-bold tracking-[0.4em] text-neutral-400 mb-12 uppercase">Nossa Filosofia</p>
          <div className="flex flex-col gap-12">
            <h2 className="phil-reveal text-4xl md:text-5xl font-light leading-snug">
              A maioria das indústrias foca em <span className="line-through italic opacity-30">produção em massa e redução de custos</span>.
            </h2>
            <h2 className="phil-reveal text-5xl md:text-8xl font-heading font-black leading-none">
              NÓS FOCAMOS EM <br />
              <span className="text-drama text-accent text-[5rem] md:text-[11rem] font-light">Eternidade.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* E. PROTOCOL - CARDS EMPILHADOS */}
      <section id="processo" className="bg-dark">
        <div className="py-40 px-8 md:px-20">
           <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-6">DOMUS PROTOCOL</p>
           <h2 className="text-offwhite text-5xl md:text-8xl font-heading font-bold leading-none mb-20">O CAMINHO PARA <br/> A PERFEIÇÃO.</h2>

           {/* Cards Stack */}
           <div className="flex flex-col gap-0">
             {[
               { n: '01', title: 'AUDITORIA SENSORIAL', desc: 'Briefing técnico para entender como você respira o espaço, definindo materiais e texturas.', img: '/891b6be8-d37e-40bf-8a2b-f86278e5cbaf.jpeg' },
               { n: '02', title: 'ENGENHARIA 3D', desc: 'Modelagem cirúrgica de cada milímetro do móvel para garantir que a visão seja 100% executada.', img: '/7bd6fc54-ea19-48a5-8627-9afb117d9af8.jpeg' },
               { n: '03', title: 'INSTALAÇÃO ELITE', desc: 'Montagem orquestrada por nossa própria fábrica, com proteção total do ambiente e resíduo zero.', img: '/d13e70d3-4812-4634-a1d6-9807eecf854b.jpeg' },
             ].map((step, idx) => (
               <div key={idx} className="stacking-card group">
                  <div className="w-full max-w-7xl mx-auto h-[80vh] flex flex-col md:flex-row overflow-hidden bg-white/5 border border-white/10 card-rounded">
                    <div className="flex-1 p-12 md:p-20 flex flex-col justify-between">
                       <span className="font-data text-accent text-lg font-bold tracking-widest">{step.n}</span>
                       <div>
                          <h3 className="text-4xl md:text-6xl font-heading font-bold text-offwhite mb-6 pr-4">{step.title}</h3>
                          <p className="text-neutral-400 text-lg md:text-xl max-w-md leading-relaxed">{step.desc}</p>
                       </div>
                       <button className="group relative flex items-center gap-4 text-offwhite font-bold tracking-widest text-xs">
                          SABER MAIS <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                       </button>
                    </div>
                    <div className="flex-1 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                       <img src={step.img} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" alt={step.title} />
                       <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* PORTFÓLIO BANNER - CONVITE */}
      <section className="py-28 px-6 md:px-20 bg-dark border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center grayscale opacity-5" style={{ backgroundImage: "url('/living.png')" }} />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="max-w-2xl">
            <span className="font-data text-accent text-[10px] font-black tracking-[0.5em] uppercase border border-accent/20 px-3.5 py-1.5 rounded-full bg-dark/80 backdrop-blur-md">
              CATÁLOGO TÉCNICO 2026
            </span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight uppercase mt-6 mb-6 leading-none">
              ENGENHARIA <br />
              <span className="text-drama text-accent font-light lowercase">sob medida.</span>
            </h2>
            <p className="text-neutral-400 text-base font-light leading-relaxed max-w-xl">
              Acesse o portfólio completo da Domus e conheça as especificações técnicas, sistemas de movimento e os projetos exclusivos assinados pela nossa marca.
            </p>
          </div>
          <button 
            onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0, 0); }}
            className="group relative overflow-hidden bg-accent hover:bg-white text-black font-bold text-xs tracking-widest px-10 py-5 rounded-full transition-transform active:scale-95 whitespace-nowrap"
          >
            <span className="relative z-10 flex items-center gap-3">
              ACESSAR PORTFÓLIO <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* E2. PROVAS SOCIAIS - DEPOIMENTOS */}
      <section id="depoimentos" className="py-32 px-8 md:px-20 bg-offwhite text-primary">
         <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
               <div>
                  <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-6">A VOZ DA EXCELÊNCIA</p>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black leading-tight max-w-3xl">
                     NÃO FAZEMOS CLIENTES. CONSTRUÍMOS <span className="italic font-drama text-accent font-light">Legados</span>.
                  </h2>
               </div>
               <div className="flex -space-x-4 justify-center md:justify-start pb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-[3px] border-offwhite bg-neutral-300 overflow-hidden shadow-lg">
                       <img src={`https://i.pravatar.cc/100?img=${i + 31}`} alt="Client" className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-[3px] border-offwhite bg-primary text-accent flex items-center justify-center text-xs font-bold font-data shadow-lg">
                     +100
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   name: "Dr. Roberto",
                   status: "online",
                   time: "09:41",
                   quote: "A Domus não entrega móveis, eles entregam relógios suíços em formato de marcenaria. A precisão no milímetro e o fechamento magnético das portas é algo que eu não tinha visto nem em móveis italianos importados."
                 },
                 {
                   name: "Arq. Mariana Alencar",
                   status: "online",
                   time: "14:12",
                   quote: "Como arquiteta, o maior pesadelo é a execução sair diferente do 3D. Com a Domus, a equipe previu e resolveu estruturas antes mesmo da obra começar. É uma paz de espírito absurda pra mim e pro meu cliente."
                 },
                 {
                   name: "Felipe (Cliente Alphaville)",
                   status: "digitando...",
                   time: "17:35",
                   quote: "Instalaram uma cozinha imensa na minha casa e quando foram embora não tinha um grão de poeira no chão. O cuidado obsessivo deles com a proteção da casa vale cada centavo. Nível altíssimo."
                 }
               ].map((testimony, i) => (
                  <div key={i} className="bg-[#efeae2] rounded-3xl shadow-xl overflow-hidden border border-black/5 flex flex-col group relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
                     
                     {/* Fundo Padrão WhatsApp (Textura) */}
                     <div className="absolute inset-0 opacity-[0.03] bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] mix-blend-multiply bg-cover pointer-events-none" />

                     {/* Header do WhatsApp */}
                     <div className="bg-[#075E54] px-5 py-4 flex items-center justify-between relative z-10 shadow-sm border-b border-black/10">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full border border-white/20 bg-neutral-300 overflow-hidden relative shadow-inner">
                              <img src={`https://i.pravatar.cc/100?img=${i + 45}`} className="w-full h-full object-cover grayscale" alt="Contato" />
                           </div>
                           <div>
                              <p className="text-white font-bold text-sm tracking-wide font-sans">{testimony.name}</p>
                              <p className="text-white/80 text-[10px] font-sans -mt-0.5">{testimony.status}</p>
                           </div>
                        </div>
                        <div className="flex gap-4 opacity-70">
                           <div className="w-4 h-4 rounded-full border-2 border-white/50" />
                           <div className="w-4 h-4 rounded-full border-2 border-white/50" />
                        </div>
                     </div>

                     {/* Corpo do Chat */}
                     <div className="p-6 flex-1 flex flex-col justify-end relative z-10">
                        <div className="flex justify-center mb-6">
                           <span className="bg-white/50 backdrop-blur-sm text-[#075E54]/60 text-[10px] px-3 py-1 rounded-xl font-bold uppercase tracking-wider shadow-sm">
                              Hoje
                           </span>
                        </div>

                        {/* Message Bubble (Client) */}
                        <div className="bg-white rounded-br-2xl rounded-bl-sm rounded-tr-2xl rounded-tl-2xl p-4 shadow-md relative max-w-[95%] text-left">
                           {/* Cauda Metáfora */}
                           <div className="absolute top-0 -left-2 w-0 h-0 border-t-[12px] border-t-white border-l-[12px] border-l-transparent drop-shadow-sm"></div>
                           
                           <p className="text-neutral-800 text-sm font-sans leading-relaxed tracking-wide">
                              {testimony.quote}
                           </p>
                           
                           <div className="flex justify-end items-center gap-1 mt-2">
                              <span className="text-[10px] font-sans font-bold text-neutral-400">{testimony.time}</span>
                              <svg viewBox="0 0 16 15" width="16" height="15" fill="none" className="opacity-100">
                                 <path d="M15.01 3.316l-7.39 10.14-3.32-3.805M10.45 3.316L4.01 12.16 1.01 8.877" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                           </div>
                        </div>
                     </div>

                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* F. FAQ - DÚVIDAS FREQUENTES */}
      <section id="faq" className="py-32 px-8 md:px-20 bg-primary">
        <div className="max-w-4xl mx-auto">
           <p className="text-accent text-[10px] font-black tracking-[0.6em] uppercase mb-4 text-center">TRANSPARÊNCIA TOTAL</p>
           <h2 className="text-offwhite text-4xl md:text-6xl font-heading font-bold mb-20 text-center">DÚVIDAS FREQUENTES.</h2>

           <div className="flex flex-col gap-4">
             {[
               { q: 'Qual a durabilidade da Laca Domus?', a: 'Utilizamos um processo de pintura com múltiplas camadas e secagem em estufa, garantindo resistência contra riscos e amarelamento superior à média do mercado.' },
               { q: 'A montagem faz sujeira na minha casa?', a: 'Não. 100% dos cortes e furações são feitos no parque fabril. Nossa equipe de instalação entra apenas para a fixação cirúrgica, mantendo seu ambiente impecável.' },
               { q: 'Vocês utilizam ferragens padrão?', a: 'Trabalhamos exclusivamente com marcas europeias de alto padrão (ex: Blum, Grass) para garantir a fluidez de movimento e sistemas de amortecimento absolutos.' },
               { q: 'Qual o tempo de engenharia e instalação?', a: 'Projetamos até os mínimos detalhes na fase de Engenharia 3D. A instalação varia de acordo com o projeto, mas ocorre em dias, não semanas, devido à nossa pré-montagem de teste.' }
             ].map((faq, i) => (
               <details key={i} className="group bg-dark/50 border border-white/10 rounded-2xl p-6 md:p-8 cursor-pointer transition-all hover:bg-dark">
                 <summary className="flex justify-between items-center font-heading font-bold text-lg md:text-xl text-offwhite list-none [&::-webkit-details-marker]:hidden">
                   <span>{faq.q}</span>
                   <span className="transition-transform duration-300 group-open:rotate-45 text-accent text-2xl">+</span>
                 </summary>
                 <div className="text-neutral-400 mt-6 leading-relaxed font-medium">
                   {faq.a}
                 </div>
               </details>
             ))}
           </div>
        </div>
      </section>

      {/* G. CONTACT & MAPS */}
      <section id="contato" className="bg-dark pt-32 pb-40 px-8 relative overflow-hidden flex flex-col items-center">
        {/* Contact Banner */}
        <div className="w-full max-w-7xl mx-auto bg-accent rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl text-primary">
            <h2 className="text-6xl md:text-[6rem] font-heading font-black leading-none mb-6 tracking-tighter">VAMOS<br/>COMEÇAR?</h2>
            <p className="text-primary/80 text-lg md:text-xl font-semibold mb-10">
              Se você busca mais que mobiliário, se você busca um legado em design, a Domus é o seu ateliê.
            </p>
            <a href="https://wa.me/5527999871797?text=Ol%C3%A1!%20Estive%20analisando%20o%20portf%C3%B3lio%20e%20o%20processo%20da%20*DOMUS*%20e%20decidi%20dar%20o%20pr%C3%B3ximo%20passo.%20Gostaria%20de%20solicitar%20o%20atendimento%20para%20iniciar%20meu%20projeto%20sob%20medida." className="inline-flex items-center gap-4 bg-primary text-offwhite px-10 py-5 rounded-full font-bold text-sm tracking-widest hover:scale-105 transition-transform group">
              CHAMAR CONSULTOR <Send size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>

          <div className="relative z-10 w-full md:w-1/2 h-[400px] border border-black/10 rounded-[2rem] overflow-hidden shadow-2xl">
             {/* Google Maps com Dark/Luxe Filter - Foco na localidade do cliente (Cariacica) */}
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3741.44166323246!2d-40.380!3d-20.350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDIxJzAwLjAiUyA0MMKwMjInNDguMCJX!5e0!3m2!1sen!2sbr!4v1714000000000" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen="" 
                loading="lazy" 
                title="Domus Location"
                referrerPolicy="no-referrer-when-downgrade">
             </iframe>
             <div className="absolute bottom-4 left-4 right-4 bg-primary/90 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 border border-offwhite/10">
                <MapPin className="text-accent" />
                <div>
                   <p className="text-offwhite font-bold text-sm font-heading">Fábrica e Ateliê</p>
                   <p className="text-offwhite/60 text-xs mt-1">Rua Pedra Azul, 15 - Jardim Botânico</p>
                </div>
             </div>
          </div>
        </div>
      </section>


      {/* G. FOOTER */}
      <footer className="bg-primary py-20 px-8 md:px-20 rounded-t-[4rem]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 border-b border-offwhite/5 pb-20">
          <div className="col-span-2">
             <div className="text-4xl font-heading font-black text-offwhite mb-8">DOMUS<span className="text-accent">.</span></div>
             <p className="text-offwhite/50 max-w-xs text-sm leading-relaxed uppercase tracking-widest font-bold">
               Cariacica, ES. <br/> Fábrica de sonhos concretos.
             </p>
          </div>
          <div>
            <h5 className="text-offwhite font-bold tracking-widest text-xs mb-8 uppercase text-accent">Navegação</h5>
            <div className="flex flex-col gap-4 text-offwhite/50 text-sm font-medium">
              <a href="#" className="hover:text-accent transition-colors tracking-widest">PROJETOS</a>
              <a href="#" className="hover:text-accent transition-colors tracking-widest">FILOSOFIA</a>
              <a href="#" className="hover:text-accent transition-colors tracking-widest">INSTAGRAM</a>
            </div>
          </div>
          <div>
            <h5 className="text-offwhite font-bold tracking-widest text-xs mb-8 uppercase text-accent">Localização</h5>
            <p className="text-offwhite/50 text-sm leading-relaxed font-medium tracking-wide">
              Rua Pedra Azul, 15 <br/> Jardim Botânico, ES
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-8 text-[10px] tracking-[0.5em] text-offwhite/40 font-bold uppercase">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              SYSTEM OPERATIONAL_2026
           </div>
           <div>
              FEITO COM MAESTRIA POR <a href="https://webix.com.br" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors font-black">WEBIX</a>
           </div>
        </div>
      </footer>

      {/* IA AUTOMATION - DOMUS.AI */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {aiOpen ? (
          <div className="bg-neutral-900 border border-white/10 w-80 h-[450px] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
            <div className="bg-accent p-6 flex justify-between items-center text-black">
               <div className="font-bold tracking-tighter text-lg">Domus.AI</div>
               <button onClick={() => setAiOpen(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 p-6 font-data text-xs leading-relaxed space-y-4">
               <div className="bg-neutral-800 p-4 rounded-2xl text-neutral-300">
                  Olá. Sou o assistente preditivo da Domus. Vi que você está interessado no nosso processo de engenharia sensorial.
               </div>
               <div className="bg-neutral-800 p-4 rounded-2xl text-neutral-300">
                  Quer ver como convertemos sua ideia em um projeto 3D milimétrico em menos de 7 dias?
               </div>
               <div className="pt-4 animate-pulse text-accent">Lendo intenção do usuário...</div>
            </div>
            <div className="p-4 border-t border-white/5 flex gap-2">
               <a href="https://wa.me/5527999871797?text=Ol%C3%A1!%20Estive%20conversando%20com%20o%20assistente%20virtual%20*Domus.AI*%20no%20site%20e%20gostaria%20de%20agendar%20o%20desenvolvimento%20do%20meu%20projeto%20em%203D%20em%20at%C3%A9%207%20dias." className="flex-1 bg-accent text-black text-[10px] font-black py-4 rounded-2xl text-center tracking-widest uppercase active:scale-95 transition-transform">
                  Falar agora
               </a>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setAiOpen(true)}
            className="w-16 h-16 bg-accent text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all group"
          >
             <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-black animate-bounce" />
          </button>
        )}
      </div>
      </>
      )}
    </div>
  );
}
