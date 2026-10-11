import { Link, useRouterState } from '@tanstack/react-router';
import { ShieldCheck, Wand2, Scale, Users, Zap, BookOpen, ArrowUpRight, LockKeyhole, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

const navigation = [
  { to: '/' as const, name: 'Moderation helper', icon: Wand2 },
  { to: '/punishments' as const, name: 'Punishment guide', icon: Scale },
  { to: '/staff-rules' as const, name: 'Staff rules', icon: Users },
  { to: '/actions' as const, name: 'Action reference', icon: Zap },
  { to: '/scenarios' as const, name: 'Common scenarios', icon: BookOpen },
];
export function Workspace({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const [open, setOpen] = useState(false);
  return <div className="workspace">
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <Link to="/" className="brand"><span className="brand-mark"><ShieldCheck size={23}/></span><span>Mod<span className="text-primary">guard</span><small>DISCORD MODERATION</small></span></Link>
      <div className="server-label"><span className="server-avatar">K</span><div>KVNG Incorporations<small>Staff workspace</small></div><LockKeyhole size={14}/></div>
      <p className="nav-label">WORKSPACE</p>
      <nav>{navigation.map(n => <Button asChild variant="ghost" key={n.to} className={`nav-item ${path === n.to ? 'active' : ''}`}><Link to={n.to} onClick={() => setOpen(false)}><n.icon size={18}/>{n.name}{n.to === '/' && <span className="ai-tag">AI</span>}</Link></Button>)}</nav>
      <div className="sidebar-bottom"><ShieldCheck size={20}/><strong>Good moderation matters.</strong><p>Stay fair. Stay consistent.<br/>Keep your community safe.</p><a href="https://support.discord.com" target="_blank" rel="noreferrer">Discord support <ArrowUpRight size={14}/></a></div>
      <div className="staff-identity"><span className="staff-avatar">M</span><div>Moderator<small>Staff handbook</small></div><span className="status-dot"/></div>
    </aside>
    <div className="main-shell"><header className="topbar"><div className="flex items-center gap-3"><Button className="mobile-menu" variant="ghost" size="icon" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button><span>Workspace</span><span className="breadcrumb-divider">/</span><strong>{navigation.find(n => n.to === path)?.name}</strong></div><span className="internal-label"><LockKeyhole size={13}/> Staff reference</span></header><main className="page-content">{children}</main><footer className="page-footer"><span>Modguard <span className="footer-separator">/</span> A safer community starts with you.</span><span>Not affiliated with Discord Inc.</span></footer></div>
  </div>;
}