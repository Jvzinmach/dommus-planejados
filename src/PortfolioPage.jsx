import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ShieldCheck, Zap, Heart, Truck, Compass, CheckCircle2, Phone, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPage({ onBack }) {
  const containerRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    // Reset Scroll para o topo ao carregar o portfólio
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
      // Fade in suave das lâminas ao scrollar
      const sections = gsap.utils.toArray('.portfolio-section');
      sections.forEach((section) => {
        gsap.fromTo(section.querySelectorAll('.fade-up-element'), 
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Animação de entrada especial para a Capa (Página 1)
      gsap.fromTo('.cover-title', 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.3 }
      );
      
      gsap.fromTo('.cover-subtitle', 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 1.2, ease: "power3.out", delay: 0.8 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Imagens locais do projeto catalogadas com precisão absoluta de marcenaria técnica 100% real
  const projects = [
    {
      title: "Home Theater Integrado Fendi",
      desc: "Painel de TV planejado em laca cinza-fendi acetinada integrado a nicho amadeirado de fundo com prateleiras suspensas iluminadas por fita de LED invisível.",
      img: "/WhatsApp Image 2026-05-17 at 17.12.55.jpeg",
      category: "Salas de Estar"
    },
    {
      title: "Penteadeira Suíte com Espelho Arco",
      desc: "Móvel sob medida sofisticado em laca rosé e madeira clara, arandelas clássicas de parede e espelho em arco retroiluminado por fita de LED quente.",
      img: "/WhatsApp Image 2026-05-17 at 17.12.56.jpeg",
      category: "Dormitórios"
    },
    {
      title: "Painel de TV com Escrivaninha Integrada",
      desc: "Bancada de estudos em madeira clara perfeitamente acoplada a painel de TV em laca branca alto brilho e gaveteiro sob medida com puxadores dourados.",
      img: "/WhatsApp Image 2026-05-17 at 17.13.40 (1).jpeg",
      category: "Dormitórios"
    },
    {
      title: "Guarda-Roupa Suíte com Portas Espelhadas",
      desc: "Armário planejado de três portas de correr em espelho plano inteiro que ampliam o quarto master, com cabeceira de cama estofada sob painel iluminado por LED.",
      img: "/WhatsApp Image 2026-05-17 at 17.13.40.jpeg",
      category: "Dormitórios"
    },
    {
      title: "Cozinha Planejada Verde Sálvia",
      desc: "Mobiliário planejado premium em laca verde sálvia com puxadores perfil lineares e nichos amadeirados quentes iluminados por fita de LED embutida.",
      img: "/WhatsApp Image 2026-05-17 at 17.14.16 (1).jpeg",
      category: "Cozinhas & Gourmet"
    },
    {
      title: "Torre Quente e Bancada Gourmet",
      desc: "Bancada de pia em quartzo branco integrado a nichos de eletrodomésticos na marcenaria amadeirada, com painel traseiro em elegante revestimento canelado.",
      img: "/WhatsApp Image 2026-05-17 at 17.14.16.jpeg",
      category: "Cozinhas & Gourmet"
    },
    {
      title: "Espaço Gourmet com Jardim Vertical",
      desc: "Área gourmet integrada com churrasqueira revestida em porcelanato de grande formato, armários planejados amadeirados e parede verde de jardim vertical.",
      img: "/WhatsApp Image 2026-05-17 at 17.14.58.jpeg",
      category: "Áreas de Lazer"
    },
    {
      title: "Gabinete de Banheiro Cuba Esculpida Dupla",
      desc: "Bancada luxuosa em quartzo esculpido com cubas duplas, espelheira superior invisível com iluminação de LED embutida e marcenaria suspensa em madeira clara.",
      img: "/WhatsApp Image 2026-05-17 at 17.16.24 (1).jpeg",
      category: "Banheiros & Lavabos"
    },
    {
      title: "Banheiro Suíte com Cuba de Sobrepor Dupla",
      desc: "Gabinete suspenso em madeira natural com gaveteiros duplos simétricos largos e nicho inferior. Bancada de mármore branco com cubas quadradas de sobrepor.",
      img: "/WhatsApp Image 2026-05-17 at 17.16.24.jpeg",
      category: "Banheiros & Lavabos"
    },
    {
      title: "Living Integrado com Porta Mimetizada Ripada",
      desc: "Painel de TV ripado com retroiluminação LED quente acoplado a rack cinza moderno, com pilar decorativo iluminado e porta invisível mimetizada ripada.",
      img: "/WhatsApp Image 2026-05-17 at 17.20.10 (1).jpeg",
      category: "Salas de Estar"
    },
    {
      title: "Buffet Suspenso com Portas em Palha Portuguesa",
      desc: "Aparador laqueado branco com portas de tela em palha portuguesa natural, adega embutida e painel ripado mel ao fundo com prateleiras metálicas brancas.",
      img: "/WhatsApp Image 2026-05-17 at 17.20.10 (2).jpeg",
      category: "Salas de Estar"
    },
    {
      title: "Home Theater com Painel Travertino e Rack Ripado",
      desc: "Painel de TV revestido em filetes de pedra mármore travertino integrado a rack inferior suspenso ripado sob medida de ponta a ponta em tom mel.",
      img: "/WhatsApp Image 2026-05-17 at 17.20.10.jpeg",
      category: "Salas de Estar"
    },
    {
      title: "Painel Off-White com Nichos Iluminados",
      desc: "Móvel de TV laqueado off-white moderno com painel ripado e prateleiras de nicho superior/lateral retroiluminados em LED de alto luxo.",
      img: "/WhatsApp Image 2026-05-17 at 17.20.11 (1).jpeg",
      category: "Salas de Estar"
    },
    {
      title: "Living Azul Petróleo com Revestimento Carvalho",
      desc: "Revestimento de parede inteira em painel de madeira carvalho claro com painel central ripado laqueado azul-petróleo e móvel com portas de treliça geométrica 3D.",
      img: "/WhatsApp Image 2026-05-17 at 17.20.11 (2).jpeg",
      category: "Salas de Estar"
    }
  ];

  return (
    <div ref={containerRef} className="bg-dark text-offwhite min-h-screen font-heading selection:bg-accent selection:text-black pb-20 relative overflow-hidden">
      
      {/* Elementos visuais decorativos (Grade de engenharia técnica ao fundo) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(230,222,202,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(230,222,202,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" />
      
      {/* NAVBAR PORTFÓLIO - ILHA VOLTAR */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[60%] flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-full shadow-2xl">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-xs tracking-widest text-neutral-400 hover:text-accent font-bold transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          VOLTAR AO INÍCIO
        </button>
        <div className="text-sm font-black tracking-tighter text-white">
          DOMUS<span className="text-accent">.</span> PORTFÓLIO
        </div>
        <a 
          href="https://wa.me/5527999871797?text=Ol%C3%A1!%20Estou%20navegando%20pelo%20*Cat%C3%A1logo%20T%C3%A9cnico%202026*%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas%20t%C3%A9cnicas%20sobre%20o%20mobili%C3%A1rio%20de%20alto%20padr%C3%A3o%20da%20Domus."
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-2 bg-accent hover:bg-white text-black font-bold text-[10px] tracking-wider px-5 py-2.5 rounded-full transition-all duration-300"
        >
          CONSULTORIA
        </a>
      </header>

      {/* ======================================================== */}
      {/* PÁGINA 1: CAPA DO PORTFÓLIO */}
      {/* ======================================================== */}
      <section className="relative h-screen flex items-center justify-center p-8 text-center overflow-hidden z-10">
        <div className="absolute inset-0 bg-cover bg-center grayscale opacity-15" style={{ backgroundImage: "url('/hero.png')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark pointer-events-none"></div>
        
        {/* Linhas cruzadas técnicas simulando engenharia */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-accent/10"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-accent/10"></div>

        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          <div className="font-data text-accent text-xs tracking-[0.6em] mb-8 uppercase animate-pulse border border-accent/20 px-4 py-2.5 rounded-full bg-dark/80 backdrop-blur-md">
            CATÁLOGO TÉCNICO 2026
          </div>
          
          <h1 className="cover-title text-6xl md:text-8xl lg:text-[7.5rem] font-heading font-black tracking-tighter leading-none text-white mb-6 uppercase">
            DOMUS<br className="sm:hidden" /> PLANEJADOS
          </h1>
          
          <p className="cover-subtitle max-w-2xl text-lg md:text-2xl text-neutral-400 font-light tracking-wide leading-relaxed mt-4">
            <span className="text-drama text-accent">Marcenaria de Alto Padrão</span> focada em excelência técnica, engenharia de precisão e design contemporâneo.
          </p>

          <div className="w-16 h-[1px] bg-accent/50 mt-16 mb-4"></div>
          <p className="text-[10px] tracking-[0.5em] text-neutral-500 font-bold uppercase">Role para explorar a engenharia</p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PÁGINA 2: POSICIONAMENTO INSTITUCIONAL */}
      {/* ======================================================== */}
      <section className="portfolio-section min-h-screen flex items-center py-32 px-6 md:px-20 relative z-10 border-t border-white/5 bg-[#081310]/80">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="fade-up-element flex items-center gap-3 text-accent text-xs font-bold tracking-[0.4em] uppercase">
            <div className="w-12 h-[1px] bg-accent" />
            02 // Posicionamento Institucional
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 fade-up-element">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[1.05]">
                POR QUE ESCOLHER A DOMUS?
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl font-light mt-8 leading-relaxed">
                Diferente da marcenaria convencional, a Domus foca na resolução de problemas estruturais e na maximização da experiência do usuário, integrando engenharia de precisão com design de luxo.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { 
                  title: "SUPORTE TÉCNICO AVANÇADO", 
                  desc: "Atuamos como uma extensão técnica do escritório de arquitetura, garantindo a viabilidade de detalhes complexos e a execução fiel do projeto criativo.",
                  icon: <Compass className="text-accent w-6 h-6" />
                },
                { 
                  title: "PADRÃO INDUSTRIAL DE PRECISÃO", 
                  desc: "Nossos processos seguem rigorosos critérios de qualidade industrial, resultando em móveis com alinhamento milimétrico e durabilidade superior.",
                  icon: <Award className="text-accent w-6 h-6" />
                },
                { 
                  title: "ATENDIMENTO PERSONALIZADO", 
                  desc: "Cada projeto é único. Oferecemos uma consultoria dedicada para entender as necessidades específicas de cada cliente e ambiente.",
                  icon: <Zap className="text-accent w-6 h-6" />
                },
                { 
                  title: "GARANTIA DE LONGEVIDADE", 
                  desc: "Investimos em materiais e ferragens de primeira linha, assegurando que o mobiliário mantenha sua performance e estética por décadas.",
                  icon: <ShieldCheck className="text-accent w-6 h-6" />
                }
              ].map((item, index) => (
                <div key={index} className="fade-up-element p-8 bg-black/30 border border-white/5 rounded-[2rem] flex flex-col justify-between h-72 hover:border-accent/20 hover:bg-black/50 transition-all duration-500">
                  <div className="p-3 bg-white/5 w-fit rounded-2xl border border-white/10">{item.icon}</div>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest text-offwhite uppercase mb-3">{item.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PÁGINA 3: ENGENHARIA DO MOVIMENTO */}
      {/* ======================================================== */}
      <section className="portfolio-section min-h-screen flex items-center py-32 px-6 md:px-20 relative z-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col gap-16 w-full">
          <div className="fade-up-element flex items-center gap-3 text-accent text-xs font-bold tracking-[0.4em] uppercase">
            <div className="w-12 h-[1px] bg-accent" />
            03 // Engenharia do Movimento
          </div>

          <div className="fade-up-element text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase leading-none mb-4">
              ENGENHARIA DO MOVIMENTO
            </h2>
            <p className="text-accent font-data text-xs tracking-[0.3em] uppercase">SISTEMAS OCULTOS | CONTROLE DE IMPACTO</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Bloco 1: Corrediças Invisíveis */}
            <div className="fade-up-element p-10 bg-[#0c1a16] border border-accent/10 rounded-[3rem] flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-neutral-800 font-data text-7xl font-black select-none pointer-events-none group-hover:text-accent/5 transition-colors">
                SYS_A
              </div>
              <div className="relative z-10">
                <span className="font-data text-accent text-xs tracking-widest uppercase border border-accent/20 px-3 py-1 rounded-full bg-dark/60">TECNOLOGIA OCULTA</span>
                <h3 className="text-3xl font-heading font-bold text-offwhite mt-8 mb-6">Corrediças Invisíveis</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-10 font-light">
                  A sofisticação reside no que é invisível. Utilizamos corrediças ocultas de extração total que preservam a pureza das linhas do móvel, garantindo uma estética minimalista sem ferragens aparentes.
                </p>
              </div>
              <ul className="space-y-4 border-t border-white/10 pt-8 relative z-10">
                {[
                  "Extração total para acesso completo",
                  "Alta capacidade de carga (até 40kg)",
                  "Ajuste tridimensional de precisão"
                ].map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-neutral-300 font-bold uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bloco 2: Amortecimento Pneumático */}
            <div className="fade-up-element p-10 bg-[#0c1a16] border border-accent/10 rounded-[3rem] flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-neutral-800 font-data text-7xl font-black select-none pointer-events-none group-hover:text-accent/5 transition-colors">
                SYS_B
              </div>
              <div className="relative z-10">
                <span className="font-data text-accent text-xs tracking-widest uppercase border border-accent/20 px-3 py-1 rounded-full bg-dark/60">CONTROLE DE IMPACTO</span>
                <h3 className="text-3xl font-heading font-bold text-offwhite mt-8 mb-6">Amortecimento Pneumático</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-10 font-light">
                  Sistemas integrados que garantem um fechamento suave, silencioso e seguro. A tecnologia de amortecimento elimina ruídos e protege a estrutura do mobiliário contra impactos constantes.
                </p>
              </div>
              <ul className="space-y-4 border-t border-white/10 pt-8 relative z-10">
                {[
                  "Fechamento suave 'Soft-Close'",
                  "Proteção contra batidas acidentais",
                  "Ciclo de vida testado (80.000 aberturas)"
                ].map((spec, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-neutral-300 font-bold uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PÁGINA 4: ESPECIFICAÇÃO TÉCNICA (MDF ULTRA) */}
      {/* ======================================================== */}
      <section className="portfolio-section min-h-screen flex items-center py-32 px-6 md:px-20 relative z-10 border-t border-white/5 bg-offwhite text-primary rounded-[3rem]">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          <div className="fade-up-element flex items-center gap-3 text-primary/70 text-xs font-bold tracking-[0.4em] uppercase">
            <div className="w-12 h-[1px] bg-primary/70" />
            04 // Especificação Técnica
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 fade-up-element">
              <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-none">
                ESPECIFICAÇÃO RIGOROSA.
              </h2>
              <p className="text-primary/70 text-lg md:text-xl font-medium mt-8 leading-relaxed">
                A longevidade do mobiliário em ambientes críticos é garantida pela nossa especificação rigorosa. Utilizamos exclusivamente MDF Ultra em áreas molhadas, oferecendo uma barreira hidrófuga superior.
              </p>
              
              <div className="mt-12 p-6 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
                <span className="font-data text-xs font-black tracking-widest uppercase">PADRÃO HYDRO-SHIELD ATIVADO</span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                {
                  title: "PROPRIEDADE HIDROFUGA",
                  subtitle: "Resistência à Umidade",
                  desc: "Tecnologia de resinas especiais que impedem o inchamento e a degradação das fibras de madeira em contato direto com a umidade excessiva de cozinhas e banheiros."
                },
                {
                  title: "PROTEÇÃO BIOLÓGICA",
                  subtitle: "Barreira Anti-Cupim",
                  desc: "Tratamento químico integrado na massa do painel que atua como repelente definitivo contra cupins e micro-organismos, preservando a integridade estrutural."
                },
                {
                  title: "CICLO DE VIDA",
                  subtitle: "Durabilidade Extrema",
                  desc: "Ao contrário do MDF convencional, o padrão Ultra mantém sua estabilidade dimensional e estética por décadas, protegendo o investimento do cliente a longo prazo."
                }
              ].map((item, index) => (
                <div key={index} className="fade-up-element p-8 bg-primary/5 border border-primary/10 rounded-[2rem] flex flex-col justify-between hover:bg-primary/10 transition-colors">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                      <h3 className="text-sm font-black tracking-widest uppercase text-primary">{item.title}</h3>
                      <span className="text-xs font-bold text-primary/60 tracking-wider font-sans bg-white px-3 py-1 rounded-full shadow-sm">{item.subtitle}</span>
                    </div>
                    <p className="text-primary/80 text-sm leading-relaxed mt-4 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PÁGINA 5: PROTOCOLO DE LOGÍSTICA E ENTREGA */}
      {/* ======================================================== */}
      <section className="portfolio-section min-h-screen flex items-center py-32 px-6 md:px-20 relative z-10 bg-dark">
        <div className="max-w-6xl mx-auto flex flex-col gap-16 w-full">
          <div className="fade-up-element flex items-center gap-3 text-accent text-xs font-bold tracking-[0.4em] uppercase">
            <div className="w-12 h-[1px] bg-accent" />
            05 // Logística & Entrega
          </div>

          <div className="fade-up-element text-center max-w-4xl mx-auto mb-8">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase leading-none mb-4">
              PROTOCOLO DE LOGÍSTICA
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Zelamos pela integridade do mobiliário do primeiro corte até a instalação final no seu ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "FASE 01",
                title: "PROTEÇÃO DE ALTA DENSIDADE",
                desc: "Cada módulo e componente é embalado individualmente com materiais de proteção técnica, eliminando riscos de atrito ou danos superficiais durante o manuseio e carregamento.",
                icon: <ShieldCheck className="text-accent w-8 h-8" />
              },
              {
                step: "FASE 02",
                title: "TRANSPORTE ESPECIALIZADO",
                desc: "Logística própria com equipe treinada para o deslocamento de mobiliário de alto padrão. O acondicionamento no veículo segue normas rígidas de estabilidade e segurança.",
                icon: <Truck className="text-accent w-8 h-8" />
              },
              {
                step: "FASE 03",
                title: "INTEGRIDADE NA MONTAGEM",
                desc: "Zelamos pela entrega impecável até o local final. O descarte de embalagens e a organização do ambiente fazem parte do nosso compromisso com a excelência na montagem.",
                icon: <Heart className="text-accent w-8 h-8" />
              }
            ].map((item, i) => (
              <div key={i} className="fade-up-element p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col justify-between h-96 relative group hover:border-accent/30 transition-all duration-500">
                <div>
                  <span className="font-data text-accent text-xs font-bold tracking-widest">{item.step}</span>
                  <h3 className="text-xl font-heading font-bold text-white uppercase tracking-tight mt-6 mb-4">{item.title}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed font-medium">{item.desc}</p>
                </div>
                <div className="p-4 bg-white/5 w-fit rounded-2xl border border-white/10 mt-6">{item.icon}</div>
              </div>
            ))}
          </div>

          <div className="fade-up-element max-w-3xl mx-auto text-center mt-12 bg-accent/5 border border-accent/20 p-8 rounded-[2rem]">
            <p className="text-drama text-xl md:text-2xl text-accent font-light italic leading-relaxed">
              "Garantimos que o padrão de fábrica seja mantido integralmente do primeiro corte até a instalação final no seu ambiente."
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PÁGINA 6: PARCERIA ESTRATÉGICA (ARQUITETOS) */}
      {/* ======================================================== */}
      <section className="portfolio-section min-h-screen flex items-center py-32 px-6 md:px-20 relative z-10 border-t border-white/5 bg-[#081310]/80">
        <div className="max-w-6xl mx-auto flex flex-col gap-16 w-full">
          <div className="fade-up-element flex items-center gap-3 text-accent text-xs font-bold tracking-[0.4em] uppercase">
            <div className="w-12 h-[1px] bg-accent" />
            06 // Parceria Estratégica
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 fade-up-element">
              <span className="font-data text-accent text-xs tracking-widest uppercase">B2B ARCHITECTURE SUPPORT</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight leading-none mt-6 uppercase">
                PARCERIA ESTRATÉGICA
              </h2>
              <p className="text-neutral-400 text-lg font-light mt-8 leading-relaxed">
                Atuamos como o braço técnico de arquitetos e designers, transformando visões criativas em realidade com precisão milimétrica e rigor executivo.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {[
                {
                  title: "Consultoria Técnica",
                  desc: "Viabilização de detalhes complexos e soluções estruturais inteligentes para projetos sob medida."
                },
                {
                  title: "Fidelidade ao Projeto",
                  desc: "Execução rigorosa seguindo fielmente cada especificação, material e detalhe planejado pelo profissional."
                },
                {
                  title: "Gestão de Prazos",
                  desc: "Compromisso inabalável com o cronograma da obra, garantindo agilidade e suporte em todas as fases."
                }
              ].map((item, idx) => (
                <div key={idx} className="fade-up-element p-8 bg-black/40 border border-white/5 rounded-3xl flex items-start gap-6 hover:border-accent/15 transition-all">
                  <div className="p-3 bg-accent/10 text-accent rounded-xl font-bold font-data text-sm shrink-0">0{idx+1}</div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PÁGINA 7: PROJETOS ASSINADOS (GALERIA PREMIUM) */}
      {/* ======================================================== */}
      <section className="portfolio-section min-h-screen py-32 px-6 md:px-20 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="fade-up-element flex items-center gap-3 text-accent text-xs font-bold tracking-[0.4em] uppercase">
            <div className="w-12 h-[1px] bg-accent" />
            07 // Projetos Assinados
          </div>

          <div className="fade-up-element flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase leading-none">
                PROJETOS ASSINADOS.
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl font-light mt-6 max-w-2xl leading-relaxed">
                Cada projeto assinado pela Domus é um testemunho de nossa dedicação ao detalhe técnico e à estética refinada, servindo como referência de qualidade para novos projetos de alto padrão.
              </p>
              {/* Indicador de clique de altíssima elegância */}
              <div className="mt-6 flex items-center gap-3 text-accent text-xs font-bold tracking-[0.25em] uppercase font-data bg-accent/5 border border-accent/15 px-5 py-3 rounded-full w-fit backdrop-blur-sm animate-pulse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span>Toque ou clique em qualquer foto para examinar os detalhes técnicos</span>
              </div>
            </div>
            <span className="font-data text-accent/50 text-xs tracking-widest font-bold border-b border-accent/20 pb-2 uppercase shrink-0">
              VITRINE EXCLUSIVA 2026
            </span>
          </div>

          {/* Galeria Imersiva Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImage(i)}
                className="fade-up-element gallery-item cursor-pointer group relative overflow-hidden rounded-[2rem] border border-white/5 bg-neutral-900/50 aspect-[4/5] flex flex-col justify-end p-8 shadow-2xl transition-all duration-700 hover:border-accent/30"
              >
                {/* Imagem de Fundo real - Sem grayscale por padrão */}
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-all duration-1000 ease-out" 
                  style={{ backgroundImage: `url('${project.img}')` }}
                />
                
                {/* Overlay de gradiente luxuoso para legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Etiqueta discreta de clique no hover do card */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-20">
                  <span className="font-data text-[8px] tracking-[0.2em] font-black uppercase bg-accent text-black px-3.5 py-1.5 rounded-full shadow-2xl border border-white/10">
                    CLIQUE PARA AMPLIAR
                  </span>
                </div>

                {/* Linhas técnicas de moldura que aparecem no hover */}
                <div className="absolute inset-4 border border-accent/0 group-hover:border-accent/20 pointer-events-none transition-all duration-500 rounded-[1.5rem]" />

                <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-data text-accent text-[9px] font-black tracking-[0.3em] uppercase bg-black/45 border border-accent/20 px-3 py-1 rounded-full backdrop-blur-md">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-white mt-4 mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-[11px] leading-relaxed font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* PÁGINA 8: ENCERRAMENTO E CONTATO */}
      {/* ======================================================== */}
      <section className="portfolio-section min-h-screen flex items-center py-32 px-6 md:px-20 relative z-10 border-t border-white/5 bg-accent text-primary rounded-t-[4rem] shadow-[0_-50px_100px_rgba(0,0,0,0.3)]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-10 w-full">
          <div className="fade-up-element flex items-center gap-3 text-primary/70 text-xs font-bold tracking-[0.4em] uppercase">
            <div className="w-12 h-[1px] bg-primary/70" />
            08 // Elevando Padrões
          </div>

          <h2 className="fade-up-element text-5xl md:text-8xl font-heading font-black tracking-tighter uppercase leading-[0.9] text-primary">
            VAMOS CONSTRUIR O PRÓXIMO NÍVEL?
          </h2>
          
          <p className="fade-up-element max-w-2xl text-lg md:text-xl font-semibold leading-relaxed text-primary/80">
            A Domus Planejados convida você a elevar o padrão dos seus projetos. Estamos prontos para oferecer uma consultoria técnica personalizada e transformar suas necessidades em soluções de marcenaria de prestígio.
          </p>

          <div className="fade-up-element w-24 h-[1px] bg-primary/30 my-4"></div>

          <div className="fade-up-element flex flex-col sm:flex-row items-center gap-6 mt-4 w-full justify-center">
            <a 
              href="https://wa.me/5527999871797?text=Ol%C3%A1!%20Finalizei%20a%20leitura%20do%20*Cat%C3%A1logo%20T%C3%A9cnico%202026*.%20Fiquei%20muito%20interessado%20nas%20especifica%C3%A7%C3%B5es%20do%20MDF%20Ultra%20e%20na%20Engenharia%20do%20Movimento.%20Gostaria%20de%20solicitar%20a%20minha%20consultoria%20personalizada."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-primary text-offwhite px-10 py-5 rounded-full font-bold text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl group"
            >
              SOLICITAR CONSULTORIA <Phone size={18} className="group-hover:rotate-12 transition-transform" />
            </a>
            
            <button 
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-primary/20 text-primary hover:bg-primary/5 px-10 py-5 rounded-full font-bold text-sm tracking-widest active:scale-95 transition-all"
            >
              VOLTAR AO SITE
            </button>
          </div>

          <div className="fade-up-element text-[10px] tracking-[0.4em] text-primary/50 font-bold uppercase mt-16 font-data flex flex-col gap-2 items-center">
            <div>DOMUS PLANEJADOS • MARCENARIA DE PRESTÍGIO 2026</div>
            <div className="text-[8px] mt-2 opacity-60">
              ESTÉTICA DIGITAL POR <a href="https://webix.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors border-b border-primary/20">WEBIX</a>
            </div>
          </div>
        </div>
      </section>

      {/* Visualizador Lightbox de Alta Definição (Lupa de Acabamento) */}
      {activeImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[99999] flex items-center justify-center p-4 md:p-10 backdrop-blur-md select-none"
          onClick={() => setActiveImage(null)}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveImage(null); }}
            className="absolute top-6 right-6 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 transition-colors z-[10000] font-sans font-bold"
          >
            ✕
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
            }}
            className="absolute left-6 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 transition-colors z-[10000] text-lg font-bold"
          >
            ←
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
            }}
            className="absolute right-6 w-12 h-12 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 transition-colors z-[10000] text-lg font-bold"
          >
            →
          </button>

          <div 
            className="max-w-5xl w-full flex flex-col items-center gap-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 max-h-[70vh] flex justify-center bg-black/40">
              <img 
                src={projects[activeImage].img} 
                alt={projects[activeImage].title}
                className="object-contain max-w-full max-h-[70vh] rounded-[2rem] shadow-2xl transition-transform duration-500 hover:scale-102"
              />
            </div>
            <div className="text-center max-w-2xl px-4">
              <span className="font-data text-accent text-[9px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
                {projects[activeImage].category}
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white mt-4 mb-2 tracking-tight">
                {projects[activeImage].title}
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light font-sans max-w-xl mx-auto">
                {projects[activeImage].desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
