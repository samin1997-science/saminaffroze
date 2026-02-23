/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Activity, 
  Brain, 
  ChevronRight, 
  ExternalLink, 
  Mail, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  Linkedin,
  PenTool
} from 'lucide-react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  stats?: { label: string; value: string; percentage: number }[];
  comparison?: { obm: string; ai: string }[];
  color: 'red' | 'blue' | 'neutral';
  link?: string;
}

// --- Constants ---
const PROJECTS: Project[] = [
  {
    id: 'agents',
    title: 'In-silico Agent-based Experiment',
    description: 'Designed multiple baseline experiment comparing feedback-adaptive, constraint-based, and unconstrained LLM agent architectures.',
    role: 'Experiment design, agent simulation, analysis',
    stats: [
      { label: 'Feedback Adaptive', value: '100%', percentage: 100 },
      { label: 'Rule-Constrained', value: '71.4%', percentage: 71 }
    ],
    color: 'blue',
    link: 'https://pitch-dolomite-0e8.notion.site/This-is-my-best-answer-An-In-Silico-Experimental-Analysis-of-Behavioral-Constraints-in-Agent-Simul-30f5d723caac80ec9d9afb49ead079b0?source=copy_link'
  },
  {
    id: 'pdc-ai',
    title: 'PDC for AI Systems',
    description: 'Adapted Performance Diagnostic Checklist (PDC) to audit LLM outputs, identifying systemic bias and performance gaps through a behavioral lens.',
    role: 'Framework adaptation, evaluation, policy translation',
    comparison: [
      { obm: 'Antecedent & Information', ai: 'Prompting & Contextual Data' },
      { obm: 'Equipment & Processes', ai: 'System Architecture & Workflows' },
      { obm: 'Knowledge & Skills', ai: 'Model Training & Capabilities' },
      { obm: 'Consequences', ai: 'Output, Impact & Monitoring' }
    ],
    color: 'red',
    link: 'https://pitch-dolomite-0e8.notion.site/Adoption-of-the-Performance-Diagnostic-Checklist-PDC-for-Artificial-Intelligence-AI-Systems-2405d723caac8025b4e5caa57621a409'
  },
  {
    id: 'composting',
    title: 'Campus Composting Experiment',
    description: 'Led mixed-methods A/B test to validate improvement in composting accuracy through sustainability interventions.',
    role: 'Experiment lead, data analysis (regression), policy design',
    stats: [
      { label: 'Control', value: '38%', percentage: 38 },
      { label: 'Intervention', value: '61.4%', percentage: 61 }
    ],
    color: 'neutral',
    link: 'https://www.proquest.com/docview/3133168873?pq-origsite=gscholar&fromopenview=true&sourcetype=Dissertations%20&%20Theses'
  }
];

const DECISIONS = [
  {
    id: 'constraint',
    question: 'Is this really a behavior problem, or a constraint problem?',
    answer: 'In agent simulation work, unconstrained LLMs drifted in ambiguous scenarios. Adding behavioral constraints produced more reliable decision-making.',
    metric: { label: 'Reliability', baseline: 45, after: 100 }
  },
  {
    id: 'significance',
    question: 'What was more socially significant?',
    answer: 'For the composting project, we prioritized infrastructural changes—redesigning bin placement and prompts—because they produced immediate, measurable shifts in community behavior.',
    metric: { label: 'Social Impact', baseline: 25, after: 61 }
  },
  {
    id: 'equity',
    question: 'What happens if this strategy works unevenly across groups?',
    answer: 'I believe each individual is unique. I examine multiple variables before picking an intervention, testing it multiple times before coming to a conclusion to ensure equity.',
    metric: { label: 'Variable Testing', baseline: 40, after: 85 }
  }
];

// --- Components ---

const StatBar = ({ label, percentage, color }: { label: string, percentage: number, color: string }) => (
  <div className="mb-4">
    <div className="flex justify-between text-[0.7rem] mb-1 text-ink-muted uppercase tracking-wider">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full rounded-full ${color === 'red' ? 'bg-accent-red' : color === 'blue' ? 'bg-accent-blue' : 'bg-neutral'}`}
      />
    </div>
  </div>
);

export default function App() {
  const [activeDecision, setActiveDecision] = useState(DECISIONS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleResumeDownload = () => {
    // Updated with provided Drive link
    const resumeUrl = 'https://drive.google.com/file/d/1cGacGEW4JCydc8lWwqUOHd_wXCXhbYoI/view?usp=drive_link';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen relative">
      <div className="bg-grid" />
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent-red z-[60] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-bg border-b-2 border-ink">
        <div className="max-w-[1400px] mx-auto flex justify-between items-stretch h-16 md:h-20">
          <div className="flex items-center px-4 md:px-8 border-r-2 border-ink bg-accent-red text-white">
            <div className="flex flex-col">
              <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-[0.3em] font-black leading-none">Samin Affroze</span>
              <span className="font-serif text-lg md:text-xl font-black italic">Shahinshah</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex flex-1 items-stretch">
            {['Profile', 'Work', 'Signals', 'Decisions', 'Outcomes', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="nav-link flex items-center border-r-2 border-ink last:border-r-0 group overflow-hidden"
              >
                <span className="relative z-10">{item}</span>
                <motion.div 
                  className="absolute inset-0 bg-accent-blue -translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                />
              </a>
            ))}
          </nav>

          <div className="flex items-stretch">
            <button 
              onClick={handleResumeDownload}
              className="flex items-center px-4 md:px-8 bg-accent-yellow text-bg font-black text-[0.6rem] md:text-[0.7rem] uppercase tracking-widest cursor-pointer hover:bg-white transition-colors border-l-2 border-ink"
            >
              Resume
            </button>
            <div className="hidden md:flex items-center px-8 bg-ink text-bg font-black text-[0.7rem] uppercase tracking-widest cursor-pointer hover:bg-accent-green transition-colors border-l-2 border-ink">
              Available
            </div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center px-6 border-l-2 border-ink"
            >
              <div className="space-y-1">
                <div className={`w-6 h-0.5 bg-ink transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`w-6 h-0.5 bg-ink transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-6 h-0.5 bg-ink transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-bg border-b-2 border-ink overflow-hidden"
            >
              <div className="flex flex-col">
                {['Profile', 'Work', 'Signals', 'Decisions', 'Outcomes', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-6 text-[0.7rem] uppercase tracking-[0.3em] font-black border-b border-ink/10 last:border-b-0 hover:bg-accent-blue hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-24 space-y-24 md:space-y-48">
        
        {/* Hero Section */}
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="max-w-5xl"
          >
            <div className="inline-block bg-accent-yellow text-bg px-4 py-1 text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-[0.3em] mb-6 md:border-2 md:border-ink">
              Behavioral Research Scientist
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start">
              <div className="flex-1">
                <h2 className="font-serif text-5xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase">
                  Modeling <br />
                  <span className="text-accent-red">Decision</span> <br />
                  Making.
                </h2>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full md:w-80 aspect-square eccentric-border overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
              >
                <img 
                  src="https://lh3.googleusercontent.com/d/1t1mLoRhTGaZcsihSzalkpR6IKyxegEV3" 
                  alt="Samin Affroze" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            <div className="mt-8 md:mt-12 grid md:grid-cols-2 gap-8 md:gap-12 items-end">
              <p className="text-lg md:text-2xl text-ink-muted leading-tight font-medium">
                Grounding AI systems in cognitive and operant frameworks. Specializing in agent-based simulation, 
                reinforcement learning, AI diagnostics, and behavioral modeling for sustainability and digital safety.
              </p>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {['Agent Simulation', 'AI Diagnostics', 'Behavioral Econ', 'Reinforcement Learning'].map(tag => (
                  <span key={tag} className="eccentric-border px-3 py-1 md:px-4 md:py-2 text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Profile Section */}
        <section id="profile" className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div className="md:sticky md:top-32">
            <span className="section-label">01 / Profile</span>
            <h3 className="section-title">Scientist grounded in operant theory.</h3>
            <div className="mt-8 md:mt-12 space-y-6 md:space-y-8 text-lg md:text-xl text-ink-muted leading-relaxed">
              <p>
                Trained in occupational therapy and Applied Behavior Analysis, I bring a practitioner's eye to 
                behavioral modeling and agent simulation. From single-subject designs to in-silico LLM agent 
                experiments, I use data to surface what systems actually reward and constrain.
              </p>
              <p>
                Skilled in SQL, SPSS, A/B testing, and translating behavioral theory into product, policy, 
                and safety decisions. Currently based in Doha, Qatar. <strong>OPEN TO RELOCATION.</strong> Trained in Qatar, India, and the United States.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:gap-8">
            <div className="eccentric-border p-8 md:p-12 bg-accent-blue text-white">
              <p className="text-5xl md:text-7xl font-serif font-black">5+</p>
              <p className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.3em] mt-4 font-bold">Years Applied Work</p>
            </div>
            <div className="eccentric-border p-8 md:p-12 bg-accent-red text-white">
              <p className="text-5xl md:text-7xl font-serif font-black">12+</p>
              <p className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.3em] mt-4 font-bold">AI Issues Surfaced</p>
            </div>
            <div className="eccentric-border p-8 md:p-12 bg-white text-bg">
              <p className="text-base md:text-lg font-serif italic font-bold leading-tight">
                "I believe in environments that invite the right decision at the right time, not willpower."
              </p>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work">
          <span className="section-label">02 / Selected Work</span>
          <h3 className="section-title">Experiments & Diagnostics</h3>
          <div className="mt-12 md:mt-24 grid md:grid-cols-3 gap-0 border-2 border-ink">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-ink last:border-r-0 group hover:bg-ink hover:text-bg transition-all flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-12 h-12 rounded-none flex items-center justify-center border-2 border-current ${
                    project.color === 'red' ? 'text-accent-red' : 
                    project.color === 'blue' ? 'text-accent-blue' : 
                    'text-accent-green'
                  }`}>
                    {project.id === 'agents' ? <Brain className="w-6 h-6" /> : 
                     project.id === 'pdc-ai' ? <Activity className="w-6 h-6" /> : 
                     <TrendingUp className="w-6 h-6" />}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 border-2 border-ink hover:bg-accent-yellow hover:text-bg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <h4 className="font-serif text-2xl md:text-3xl font-black mb-6 leading-none uppercase tracking-tighter">{project.title}</h4>
                <p className="text-base md:text-lg mb-8 flex-grow font-medium opacity-80">{project.description}</p>
                <div className="mt-auto space-y-6">
                  {project.stats && project.stats.map(stat => (
                    <div key={stat.label}>
                      <div className="flex justify-between text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-widest mb-2">
                        <span>{stat.label}</span>
                        <span>{stat.value}</span>
                      </div>
                      <div className="h-1 bg-current opacity-20" />
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.percentage}%` }}
                        className="h-1 bg-current -mt-1"
                      />
                    </div>
                  ))}
                  {project.comparison && (
                    <div className="space-y-4 border-t-2 border-current pt-6 mt-4">
                      <div className="grid grid-cols-2 text-[0.45rem] font-black uppercase tracking-widest opacity-50 mb-2">
                        <span>OBM / Behavioral</span>
                        <span>AI Systems</span>
                      </div>
                      {project.comparison.map((item, i) => (
                        <div key={i} className="grid grid-cols-2 gap-4 text-[0.55rem] font-bold leading-tight">
                          <span className="opacity-70">{item.obm}</span>
                          <span className="text-accent-red">{item.ai}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest mt-8 font-black opacity-50">Role: {project.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Signals Section */}
        <section id="signals" className="border-2 border-ink p-8 md:p-16 bg-accent-yellow text-bg">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <span className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.3em] font-black">03 / Signals</span>
              <h3 className="font-serif text-4xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mt-6 md:mt-8">
                What is <br className="hidden md:block" /> the data <br className="hidden md:block" /> <span className="text-accent-red">saying?</span>
              </h3>
              <p className="mt-8 md:mt-12 text-lg md:text-xl font-bold leading-tight max-w-md">
                Findings from mixed-methods A/B tests and regression analysis. 
                Infrastructure changes drive behavior more reliably than awareness campaigns.
              </p>
            </div>
            <div className="grid gap-6 md:gap-8">
              <div className="p-8 md:p-12 border-2 border-bg bg-white">
                <p className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest font-black mb-4">Finding 01</p>
                <p className="text-4xl md:text-6xl font-serif font-black leading-none">100%</p>
                <p className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-widest font-bold mt-2">Accuracy</p>
                <p className="text-xs md:text-sm mt-4 font-medium">Feedback-adaptive agents prioritized accuracy even during ambiguous scenarios.</p>
              </div>
              <div className="p-8 md:p-12 border-2 border-bg bg-accent-blue text-white">
                <p className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest font-black mb-4">Finding 02</p>
                <p className="text-4xl md:text-6xl font-serif font-black leading-none">61.4%</p>
                <p className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-widest font-bold mt-2">Accuracy Improvement</p>
                <p className="text-xs md:text-sm mt-4 font-medium">The 61% improvement in composting occurred in a context where no education on composting was actually provided.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Decisions Section */}
        <section id="decisions">
          <span className="section-label">04 / Decisions</span>
          <h3 className="section-title">How I choose where to intervene.</h3>
          <div className="mt-12 md:mt-24 grid md:grid-cols-2 gap-0 border-2 border-ink">
            <div className="flex flex-col">
              {DECISIONS.map((decision, idx) => (
                <button 
                  key={decision.id}
                  onClick={() => setActiveDecision(decision)}
                  className={`w-full text-left p-8 md:p-12 border-b-2 border-ink last:border-b-0 transition-all ${
                    activeDecision.id === decision.id 
                    ? 'bg-accent-blue text-white' 
                    : 'bg-transparent text-ink-muted hover:bg-ink/5'
                  }`}
                >
                  <p className="text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-widest mb-4 opacity-50">Question {idx + 1}</p>
                  <p className="text-xl md:text-2xl font-serif font-black leading-tight">{decision.question}</p>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeDecision.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 md:p-16 bg-white text-bg flex flex-col justify-center"
              >
                <h4 className="text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-[0.3em] mb-6 md:mb-8">Outcome in Practice</h4>
                <p className="text-xl md:text-3xl font-serif font-black leading-tight mb-8 md:mb-12 italic">"{activeDecision.answer}"</p>
                {activeDecision.id !== 'equity' && (
                  <div className="space-y-8 md:space-y-10">
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex justify-between text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-widest">
                        <span>Baseline {activeDecision.metric.label}</span>
                        <span>{activeDecision.metric.baseline}%</span>
                      </div>
                      <div className="h-2 bg-bg/10">
                        <div className="h-full bg-bg opacity-30" style={{ width: `${activeDecision.metric.baseline}%` }} />
                      </div>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex justify-between text-[0.5rem] md:text-[0.6rem] font-black uppercase tracking-widest">
                        <span>Post-Intervention {activeDecision.metric.label}</span>
                        <span>{activeDecision.metric.after}%</span>
                      </div>
                      <div className="h-2 bg-accent-red">
                        <div className="h-full bg-accent-red" style={{ width: `${activeDecision.metric.after}%` }} />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Outcomes Section */}
        <section id="outcomes">
          <span className="section-label">05 / Outcomes</span>
          <h3 className="section-title">What changed, and for whom.</h3>
          <div className="mt-12 md:mt-24 space-y-0 border-2 border-ink">
            {[
              { track: 'Individuals', text: 'Students achieved 61.4% composting accuracy after infrastructure changes.', color: 'blue' },
              { track: 'Systems', text: 'Interventions modified for specific target audiences, moving away from one-size-fits-all diagnostics.', color: 'red' },
              { track: 'Risk Surfaces', text: 'LLM hallucination and bias variance narrowed through systematic evaluation.', color: 'green' }
            ].map((outcome, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex flex-col md:flex-row border-b-2 border-ink last:border-b-0 group hover:bg-ink hover:text-bg transition-all"
              >
                <div className="p-8 md:p-12 md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-ink flex flex-row md:flex-col justify-between items-center md:items-start">
                  <span className={`text-[0.6rem] md:text-[0.7rem] font-black uppercase tracking-[0.2em] ${
                    outcome.color === 'blue' ? 'text-accent-blue' : 
                    outcome.color === 'red' ? 'text-accent-red' : 'text-accent-green'
                  } group-hover:text-current`}>{outcome.track}</span>
                </div>
                <div className="p-8 md:p-12 md:w-2/3">
                  <p className="text-2xl md:text-4xl font-serif font-black leading-tight">{outcome.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-48 border-t-2 border-ink">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div>
              <span className="section-label">06 / Contact</span>
              <h3 className="section-title">Work on behavioral systems with me.</h3>
              <p className="mt-8 md:mt-12 text-xl md:text-2xl font-bold leading-tight text-ink-muted">
                Open to roles and collaborations in behavioral research, reinforcement learning, agent simulation, AI diagnostics, and sustainability.
              </p>
            </div>
            <div className="grid gap-4">
              <a href="mailto:samin.1997@gmail.com" className="eccentric-border p-8 md:p-12 flex justify-between items-center group hover:bg-accent-red hover:text-white transition-all">
                <span className="text-2xl md:text-3xl font-serif font-black uppercase tracking-tighter">Email</span>
                <Mail className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
              </a>
              <a href="https://linkedin.com/in/samin-affroze" target="_blank" rel="noopener noreferrer" className="eccentric-border p-8 md:p-12 flex justify-between items-center group hover:bg-accent-blue hover:text-white transition-all">
                <span className="text-2xl md:text-3xl font-serif font-black uppercase tracking-tighter">LinkedIn</span>
                <Linkedin className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
              </a>
              <a href="https://medium.com/@saminaffroze" target="_blank" rel="noopener noreferrer" className="eccentric-border p-8 md:p-12 flex justify-between items-center group hover:bg-accent-green hover:text-white transition-all">
                <span className="text-2xl md:text-3xl font-serif font-black uppercase tracking-tighter">Writing</span>
                <PenTool className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-ink/5 text-[0.65rem] uppercase tracking-widest text-ink-muted flex justify-between items-center">
        <p>© 2026 Samin Affroze Shahinshah</p>
        <p>Built as a thinking environment about behavioral systems.</p>
      </footer>
    </div>
  );
}
