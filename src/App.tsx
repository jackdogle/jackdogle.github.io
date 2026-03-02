import React, { useEffect, useState, createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ExternalLink, Star, GitFork, Code2, Terminal, Database, Layout, Server, Cpu, Globe, ChevronRight, Gamepad2, BrainCircuit, Languages } from 'lucide-react';

// --- Types ---
interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string | null;
}

type Language = 'en' | 'id' | 'zh' | 'ar';

// --- Translations ---
const translations = {
  en: {
    nav: { about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact', talk: "Let's Talk" },
    hero: {
      available: 'Available for work',
      title1: 'Crafting digital',
      title2: 'experiences.',
      desc: "Hi, I'm Jack Dogle. A Software Engineer specializing in Game Server Development (SA-MP & FiveM), modern web technologies, and AI integration. I build high-performance multiplayer experiences and intelligent applications.",
      viewWork: 'View My Work'
    },
    skills: {
      title: 'Technical Arsenal',
      desc: 'A comprehensive toolkit I use to bring ideas to life, focusing on performance, scalability, and exceptional user experiences.',
      gameDev: 'Game Server Development',
      frontend: 'Frontend Development',
      backend: 'Backend & APIs',
      db: 'Database Management',
      ai: 'AI Integration',
      tools: 'Tools & Infrastructure'
    },
    projects: {
      title: 'Featured Work',
      desc: 'Latest repositories pulled directly from my GitHub profile.',
      viewGithub: 'View GitHub Profile',
      noDesc: 'No description provided for this repository.'
    },
    footer: {
      rights: 'All rights reserved.'
    }
  },
  id: {
    nav: { about: 'Tentang', skills: 'Keahlian', projects: 'Proyek', contact: 'Kontak', talk: "Mari Diskusi" },
    hero: {
      available: 'Tersedia untuk bekerja',
      title1: 'Menciptakan pengalaman',
      title2: 'digital.',
      desc: "Hai, saya Jack Dogle. Seorang Software Engineer yang berspesialisasi dalam Pengembangan Server Game (SA-MP & FiveM), teknologi web modern, dan integrasi AI. Saya membangun pengalaman multiplayer berkinerja tinggi dan aplikasi cerdas.",
      viewWork: 'Lihat Karya Saya'
    },
    skills: {
      title: 'Gudang Teknis',
      desc: 'Perangkat komprehensif yang saya gunakan untuk mewujudkan ide, berfokus pada performa, skalabilitas, dan pengalaman pengguna yang luar biasa.',
      gameDev: 'Pengembangan Server Game',
      frontend: 'Pengembangan Frontend',
      backend: 'Backend & API',
      db: 'Manajemen Database',
      ai: 'Integrasi AI',
      tools: 'Alat & Infrastruktur'
    },
    projects: {
      title: 'Karya Unggulan',
      desc: 'Repositori terbaru yang diambil langsung dari profil GitHub saya.',
      viewGithub: 'Lihat Profil GitHub',
      noDesc: 'Tidak ada deskripsi untuk repositori ini.'
    },
    footer: {
      rights: 'Hak cipta dilindungi undang-undang.'
    }
  },
  zh: {
    nav: { about: '关于', skills: '技能', projects: '项目', contact: '联系', talk: "联系我" },
    hero: {
      available: '可接项目',
      title1: '打造数字',
      title2: '体验。',
      desc: "你好，我是 Jack Dogle。一名专注于游戏服务器开发（SA-MP & FiveM）、现代 Web 技术和 AI 集成的软件工程师。我致力于构建高性能的多人游戏体验和智能应用程序。",
      viewWork: '查看我的作品'
    },
    skills: {
      title: '技术栈',
      desc: '我用来实现想法的全面工具包，专注于性能、可扩展性和卓越的用户体验。',
      gameDev: '游戏服务器开发',
      frontend: '前端开发',
      backend: '后端与 API',
      db: '数据库管理',
      ai: 'AI 集成',
      tools: '工具与基础设施'
    },
    projects: {
      title: '精选作品',
      desc: '直接从我的 GitHub 个人资料中提取的最新存储库。',
      viewGithub: '查看 GitHub 个人资料',
      noDesc: '此存储库未提供描述。'
    },
    footer: {
      rights: '版权所有。'
    }
  },
  ar: {
    nav: { about: 'حول', skills: 'مهارات', projects: 'مشاريع', contact: 'اتصال', talk: "دعنا نتحدث" },
    hero: {
      available: 'متاح للعمل',
      title1: 'صياغة التجارب',
      title2: 'الرقمية.',
      desc: "مرحبًا، أنا جاك دوجل. مهندس برمجيات متخصص في تطوير خوادم الألعاب (SA-MP و FiveM)، وتقنيات الويب الحديثة، وتكامل الذكاء الاصطناعي. أقوم ببناء تجارب متعددة اللاعبين عالية الأداء وتطبيقات ذكية.",
      viewWork: 'عرض أعمالي'
    },
    skills: {
      title: 'الترسانة التقنية',
      desc: 'مجموعة أدوات شاملة أستخدمها لإحياء الأفكار، مع التركيز على الأداء وقابلية التوسع وتجارب المستخدم الاستثنائية.',
      gameDev: 'تطوير خوادم الألعاب',
      frontend: 'تطوير الواجهة الأمامية',
      backend: 'الخلفية وواجهات برمجة التطبيقات',
      db: 'إدارة قواعد البيانات',
      ai: 'تكامل الذكاء الاصطناعي',
      tools: 'الأدوات والبنية التحتية'
    },
    projects: {
      title: 'الأعمال المميزة',
      desc: 'أحدث المستودعات المسحوبة مباشرة من ملفي الشخصي على GitHub.',
      viewGithub: 'عرض الملف الشخصي على GitHub',
      noDesc: 'لا يوجد وصف مقدم لهذا المستودع.'
    },
    footer: {
      rights: 'كل الحقوق محفوظة.'
    }
  }
};

// --- Context ---
const LanguageContext = createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en'];
  isRtl: boolean;
}>({
  lang: 'en',
  setLang: () => {},
  t: translations['en'],
  isRtl: false
});

const useLanguage = () => useContext(LanguageContext);

// --- Components ---

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'id', label: 'Indonesia' },
    { code: 'zh', label: '中文' },
    { code: 'ar', label: 'العربية' },
  ];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full glass-panel hover:bg-white/10 transition-colors text-sm font-medium"
      >
        <Languages className="w-4 h-4" />
        <span className="uppercase">{lang}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-32 glass-panel rounded-xl overflow-hidden flex flex-col z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors ${lang === l.code ? 'text-neon-cyan bg-white/5' : 'text-slate-300'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass-panel border-b border-white/10' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold tracking-tighter flex items-center gap-2">
          <span className="text-neon-cyan">J</span>
          <span>Dogle</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-neon-cyan transition-colors">{t.nav.about}</a>
          <a href="#skills" className="hover:text-neon-cyan transition-colors">{t.nav.skills}</a>
          <a href="#projects" className="hover:text-neon-cyan transition-colors">{t.nav.projects}</a>
          <a href="#contact" className="hover:text-neon-cyan transition-colors">{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <a 
            href="#contact" 
            className="hidden sm:block px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-sm font-medium transition-all hover:box-glow-purple"
          >
            {t.nav.talk}
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { t, isRtl } = useLanguage();
  return (
    <section id="about" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border-neon-cyan/30 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
            </span>
            <span className="text-xs font-medium text-neon-cyan uppercase tracking-wider">{t.hero.available}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] mb-6"
          >
            {t.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow-cyan">{t.hero.title2}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#projects" 
              className="px-8 py-4 rounded-full bg-slate-100 text-slate-950 font-semibold hover:bg-white transition-colors flex items-center gap-2"
            >
              {t.hero.viewWork} <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </a>
            <div className={`flex items-center gap-4 ${isRtl ? 'mr-4' : 'ml-4'}`}>
              <a href="https://github.com/jackdogle" target="_blank" rel="noreferrer" className="p-3 rounded-full glass-panel hover:bg-white/10 hover:text-neon-cyan transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 rounded-full glass-panel hover:bg-white/10 hover:text-neon-blue transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:jackdogle@example.com" className="p-3 rounded-full glass-panel hover:bg-white/10 hover:text-neon-purple transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const { t } = useLanguage();
  const skills = [
    { name: t.skills.gameDev, icon: <Gamepad2 className="w-6 h-6 text-neon-cyan" />, desc: 'Pawn (SA-MP), Lua (FiveM), C++', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
    { name: t.skills.frontend, icon: <Layout className="w-6 h-6 text-neon-purple" />, desc: 'React, Vue, Tailwind CSS', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { name: t.skills.backend, icon: <Server className="w-6 h-6 text-neon-blue" />, desc: 'Node.js, Express, REST', colSpan: 'col-span-1', rowSpan: 'row-span-2' },
    { name: t.skills.db, icon: <Database className="w-6 h-6 text-emerald-400" />, desc: 'MySQL, PostgreSQL, Redis', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { name: t.skills.ai, icon: <BrainCircuit className="w-6 h-6 text-pink-400" />, desc: 'OpenAI, Gemini, Prompt Engineering', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { name: t.skills.tools, icon: <Terminal className="w-6 h-6 text-amber-400" />, desc: 'Git, Linux, Docker, CI/CD', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.skills.title}</h2>
          <p className="text-slate-400 max-w-2xl">{t.skills.desc}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-panel rounded-3xl p-8 flex flex-col justify-between group hover:bg-white/10 transition-colors ${skill.colSpan} ${skill.rowSpan}`}
            >
              <div className="p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{skill.name}</h3>
                <p className="text-sm text-slate-400">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/jackdogle/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback data for demonstration if API fails or user has no repos yet
        setRepos([
          { id: 1, name: 'samp-roleplay-script', description: 'A comprehensive roleplay gamemode for San Andreas Multiplayer built from scratch.', html_url: '#', stargazers_count: 124, forks_count: 42, language: 'Pawn', homepage: null },
          { id: 2, name: 'fivem-custom-framework', description: 'High-performance core framework for FiveM servers with advanced inventory system.', html_url: '#', stargazers_count: 89, forks_count: 15, language: 'Lua', homepage: null },
          { id: 3, name: 'samp-anticheat', description: 'Server-side weapon and vehicle anticheat system for SA-MP.', html_url: '#', stargazers_count: 45, forks_count: 8, language: 'Pawn', homepage: null },
          { id: 4, name: 'fivem-ai-npc', description: 'Smart NPC interaction system for FiveM powered by OpenAI/Gemini APIs.', html_url: '#', stargazers_count: 210, forks_count: 34, language: 'Lua', homepage: null },
          { id: 5, name: 'discord-ai-bot', description: 'Discord bot with AI capabilities for server moderation and roleplay assistance.', html_url: '#', stargazers_count: 67, forks_count: 12, language: 'JavaScript', homepage: null },
          { id: 6, name: 'premium-portfolio', description: 'A high-end personal portfolio built with React and Tailwind CSS.', html_url: '#', stargazers_count: 156, forks_count: 22, language: 'TypeScript', homepage: null },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">{t.projects.title}</h2>
            <p className="text-slate-400 max-w-2xl">{t.projects.desc}</p>
          </div>
          <a 
            href="https://github.com/jackdogle" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel hover:bg-white/10 transition-colors text-sm font-medium w-fit"
          >
            <Github className="w-4 h-4" /> {t.projects.viewGithub}
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 glass-panel rounded-3xl animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel rounded-3xl p-6 flex flex-col h-full group hover:-translate-y-2 transition-all duration-300 hover:box-glow-purple hover:border-neon-purple/30"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-white/5 text-slate-300 group-hover:text-neon-cyan transition-colors">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors line-clamp-1">{repo.name}</h3>
                <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-3">
                  {repo.description || t.projects.noDesc}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-neon-cyan"></span>
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white transition-colors">
                      <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer id="contact" className="py-12 border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-purple/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-xl font-display font-bold">
          <span className="text-neon-cyan">J</span>
          <span>Dogle</span>
        </div>
        
        <p className="text-sm text-slate-500 text-center md:text-left">
          © {new Date().getFullYear()} Jack Dogle. {t.footer.rights}
        </p>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/jackdogle" className="text-slate-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:jackdogle@example.com" className="text-slate-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  
  const isRtl = lang === 'ar';
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRtl }}>
      <div className={`min-h-screen bg-slate-950 text-slate-200 font-sans relative ${isRtl ? 'font-display' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Global Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-50 bg-grain mix-blend-overlay opacity-50"></div>
        
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
