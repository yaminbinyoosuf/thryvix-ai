import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

const articles: Article[] = [
  {
    slug: 'why-indian-clinics-run-on-paper-registers',
    title: 'Why Indian Clinics Still Run on Paper Registers in 2026',
    date: 'July 2026',
    readTime: '4 min read',
    excerpt:
      "Walk into any independent clinic in Kerala today. Chances are, the receptionist has a paper register open on the desk. Every patient's name, time, and doctor written by hand.",
    content: [
      "Walk into any independent clinic in Kerala today. Chances are, the receptionist has a paper register open on the desk. Every patient's name, time, and doctor written by hand. The queue managed by memory and shouting across the waiting room.",
      'This is not because clinic owners are behind the times. Most of them have smartphones. Many have WhatsApp groups for staff. Some even have accounting software. The problem is that software has never become the operational layer of these clinics. It sits beside the work, not underneath it.',
      'The senior receptionist who knows every patient by name, remembers which doctor they prefer, knows who always cancels at the last minute — that person is the operating system. When they go on leave, the clinic slows down. When they quit, years of institutional knowledge walk out the door.',
      'This is the problem THRYVIX is built to solve. Not by replacing the receptionist, but by giving every clinic a memory that persists — a permanent intelligence layer that remembers what the receptionist knows, predicts what will happen next, and gets smarter every day it runs.',
      'India has over 8 lakh private clinics. Almost none of them have an intelligence layer underneath their operations. Most booking apps built for this market are just that — booking apps. They capture the appointment. They do not capture the pattern. They do not remember the patient. They do not predict the no-show. They do not send the right message at the right time without someone manually deciding to do it.',
      'THRYVIX started in Manjeri, Malappuram — a clinic with one doctor, one receptionist, and a paper queue register. That is the right place to start. Not because it is the biggest market, but because it is the most honest proof of the problem. Infrastructure always starts somewhere ordinary.',
      'The question was never whether Indian clinics need this. The question was whether the economics of building it finally work. In 2026, they do. WhatsApp Business API is programmable at low cost. AI inference is cheap enough to run on every patient interaction. The barrier that made this impossible collapsed. THRYVIX is being built in exactly that window.'
    ]
  },
  {
    slug: 'what-thryvix-is-building',
    title: 'What THRYVIX Is Building — And Why It Starts in Malappuram',
    date: 'July 2026',
    readTime: '5 min read',
    excerpt:
      'THRYVIX is not a clinic booking app. This is the most important thing to understand about what we are building — and the easiest thing to get wrong.',
    content: [
      'THRYVIX is not a clinic booking app. This is the most important thing to understand about what we are building — and the easiest thing to get wrong.',
      'A booking app captures an appointment. THRYVIX captures the pattern underneath the appointment. The patient who books every Monday at 9 AM and cancels 40% of the time. The doctor whose consultation runs 12 minutes on average, not the 7 minutes the slot was built for. The week that always has low attendance because it falls after a local festival. These patterns exist in every clinic. No booking app sees them. THRYVIX does.',
      'We call this Operational Intelligence Infrastructure. It is a new category — the persistent memory and intelligence layer that sits underneath how organisations think, remember, decide, and coordinate. It does not exist today under that name. No company owns it. That is expected. Every category that matters was invisible before someone built it.',
      'THRYVIX started in Malappuram for a specific reason. The founder grew up here. Speaks Malayalam. Knows which clinics in Areekode matter, which doctors the community trusts, which WhatsApp groups the clinic owners are in. That is not a small advantage. It is the entire distribution strategy in Phase 1. You cannot replicate local trust with funding.',
      'The product being built is three layers. The first is the operating system for clinics — queue management, patient booking, WhatsApp automation, Health IDs, no-show prediction, weekly intelligence reports. This is live today in Malappuram. The second is the intelligence layer that sits underneath — processing every appointment, every cancellation, every pattern across every clinic on THRYVIX. The third is the network that emerges when enough organisations are connected — where a new patient\'s no-show risk can be predicted from patterns seen across 500 other clinics, not just one.',
      'Today, THRYVIX runs a free trial for clinics in the Areekode area of Malappuram. The goal is simple: show each clinic their own data after the trial period. No-shows prevented. Time saved. Revenue recovered. Let the numbers do the selling.',
      'The vision is larger. Kerala is the proof of concept. Every industry — commerce, education, government, cooperatives — runs on the same human memory problem that clinics do. THRYVIX is building one intelligence layer that configures for all of them.',
      'Infrastructure always starts somewhere ordinary. This one started with a queue register in a clinic in Manjeri.'
    ]
  }
];

export default function Blog() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  return (
    <section id="blog" className="py-24 bg-white border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-3">// From the blog</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black leading-tight">
          Notes on building<br />infrastructure.
        </h2>
        <p className="text-sm text-black/60 max-w-md mt-3 mb-12">
          Thoughts on Indian clinics, operational intelligence, and why THRYVIX starts in Kerala.
        </p>

        <div className="space-y-6">
          {articles.map((article) => {
            const isOpen = openSlug === article.slug;
            return (
              <article
                key={article.slug}
                id={article.slug}
                className="border border-black/5 rounded-2xl bg-neutral-50/30 p-6 md:p-8 transition-all"
              >
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </span>
                  <span className="text-black/20">·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-black tracking-tight leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-black/60 mt-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {isOpen && (
                  <div className="mt-6 pt-6 border-t border-black/5 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    {article.content.map((paragraph, i) => (
                      <p key={i} className="text-sm text-black/70 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setOpenSlug(isOpen ? null : article.slug)}
                  className="mt-6 inline-flex items-center gap-1.5 font-sans text-xs font-bold text-black hover:gap-2.5 transition-all"
                >
                  {isOpen ? 'Show less' : 'Read more'}
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
