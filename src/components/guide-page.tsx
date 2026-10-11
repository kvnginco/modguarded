import { useState } from 'react';
import { Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { handbook } from '@/lib/handbook';
import { Workspace } from './workspace';
import { Button } from './ui/button';

export function GuidePage({ kind, title, description }: { kind: keyof typeof handbook; title: string; description: string }) {
 const [search, setSearch] = useState('');
 const entries = handbook[kind].filter(e => `${e.title} ${e.lines.join(' ')}`.toLowerCase().includes(search.toLowerCase()));
 return <Workspace><div className="page-heading"><div className="eyebrow"><ShieldCheck size={15}/> STAFF HANDBOOK</div><h1>{title}</h1><p>{description}</p></div><label className="guide-search"><Search size={18}/><input aria-label={`Search ${title}`} placeholder="Search the handbook…" value={search} onChange={e => setSearch(e.target.value)}/><span>{entries.length} sections</span></label><div className="guide-grid">{entries.map(e => <article className="guide-card" key={e.title}><div className="flex items-center justify-between gap-2"><h2>{e.title}</h2>{e.severity && <span className={`severity ${e.severity}`}>{e.severity}</span>}</div><ol>{e.lines.map((line,i) => <li key={i}><span className="step-number">{i+1}</span><span>{line}</span></li>)}</ol>{kind === 'punishments' && <Button asChild variant="link" className="px-0"><Link to="/">Review a situation <ArrowRight/></Link></Button>}</article>)}</div>{entries.length === 0 && <div className="empty-search">No matching rules. Try another search.</div>}</Workspace>;
}