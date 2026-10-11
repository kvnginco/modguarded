import { createFileRoute, Link } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ShieldCheck, ImagePlus, X, Wand2, Check, Copy, Scale, TriangleAlert, BookOpen, LoaderCircle, ChevronDown, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Workspace } from '@/components/workspace';
import { Button } from '@/components/ui/button';
import { analyzeSituation, chatModeration } from '@/lib/moderation.functions';
import { handbook } from '@/lib/handbook';
import shield from '@/assets/moderation-shield.jpg';

export const Route = createFileRoute('/')({
 head: () => ({ meta: [{ title: 'Modguard — AI Moderation Helper' }, { name: 'description', content: 'Review Discord situations with AI guidance grounded in your staff handbook.' }, { property: 'og:title', content: 'Modguard — AI Moderation Helper' }, { property: 'og:description', content: 'Fair, consistent Discord moderation guidance.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: Index,
});

function Index() {
 const [description, setDescription] = useState('');
 const [violation, setViolation] = useState('');
 const [offense, setOffense] = useState(1);
 const [image, setImage] = useState<string>();
 const [fileName, setFileName] = useState('');
 const [error, setError] = useState('');
 const [result, setResult] = useState('');
 const [loading, setLoading] = useState(false);
 const [drag, setDrag] = useState(false);
 const [copied, setCopied] = useState(false);
 const fileInput = useRef<HTMLInputElement>(null);

 // Chat state
 const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; image?: string }[]>([]);
 const [chatInput, setChatInput] = useState('');
 const [chatImage, setChatImage] = useState<string>();
 const [chatFileName, setChatFileName] = useState('');
 const [chatLoading, setChatLoading] = useState(false);
 const [chatDrag, setChatDrag] = useState(false);
 const chatFileInput = useRef<HTMLInputElement>(null);
 const chatEndRef = useRef<HTMLDivElement>(null);

 async function upload(file?: File) {
  if (!file) return;
  if (!['image/png','image/jpeg','image/webp'].includes(file.type)) { setError('Choose a PNG, JPG, or WebP screenshot.'); return; }
  if (file.size > 5 * 1024 * 1024) { setError('Your screenshot must be smaller than 5 MB.'); return; }
  const reader = new FileReader();
  reader.onload = () => { if (typeof reader.result === 'string') { setImage(reader.result); setFileName(file.name); setError(''); } };
  reader.readAsDataURL(file);
 }
 async function analyze() {
  if (loading) return;
  setLoading(true); setError(''); setResult('');
  try {
   const response = await analyzeSituation({ data: { description, violation, offense, image } });
   if (response.text) {
    setResult(response.text);
    setMessages([{ role: 'user', text: description || 'Screenshot upload', image: image }, { role: 'assistant', text: response.text }]);
   }
   setError(response.error);
  }
  catch { setError('Could not reach AI guidance. Your situation has been kept; no action was taken.'); }
  finally { setLoading(false); }
 }

 async function sendChat() {
  if (chatLoading) return;
  if (!chatInput.trim() && !chatImage) return;
  setChatLoading(true);
  const userMessage = { role: 'user' as const, text: chatInput, image: chatImage };
  setMessages(prev => [...prev, userMessage]);
  setChatInput('');
  const savedImage = chatImage;
  setChatImage(undefined);
  setChatFileName('');
  try {
   const response = await chatModeration({ data: { messages: [...messages, userMessage], image: savedImage } });
   if (response.text) {
    setMessages(prev => [...prev, { role: 'assistant', text: response.text }]);
   }
   if (response.error) setError(response.error);
  } catch { setError('Could not reach AI guidance. Your message has been kept; no action was taken.'); }
  finally { setChatLoading(false); }
 }

 async function uploadChat(file?: File) {
  if (!file) return;
  if (!['image/png','image/jpeg','image/webp'].includes(file.type)) { setError('Choose a PNG, JPG, or WebP screenshot.'); return; }
  if (file.size > 5 * 1024 * 1024) { setError('Your screenshot must be smaller than 5 MB.'); return; }
  const reader = new FileReader();
  reader.onload = () => { if (typeof reader.result === 'string') { setChatImage(reader.result); setChatFileName(file.name); setError(''); } };
  reader.readAsDataURL(file);
 }
 return <Workspace>
  <section className="welcome-banner"><img src={shield} alt="Emerald shield with a checkmark" width={1536} height={512}/><div className="welcome-copy"><div className="eyebrow"><span className="status-dot"/> YOUR COMMUNITY, PROTECTED</div><h1>A little clarity.<br/>A safer community.</h1><p>Make the right call, with your handbook<br className="desktop-break"/> and a second opinion by your side.</p><span className="welcome-signature"><ShieldCheck size={15}/> The Modguard workspace</span></div></section>
  <div className="helper-layout"><section className="helper-section"><div className="section-heading"><span className="section-icon"><Wand2 size={21}/></span><div><h2>Moderation helper <span className="ai-tag">AI POWERED</span></h2><p>Let’s take a closer look at the situation.</p></div></div>
  <div className="helper-form"><div className="field-heading"><label>Screenshot evidence</label><span>Optional</span></div>
  <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Upload screenshot" onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }}/>
  {image ? <div className="image-preview"><img src={image} alt="Uploaded screenshot evidence"/><div><span>{fileName}</span><Button variant="ghost" size="icon" aria-label="Remove screenshot" onClick={() => { setImage(undefined); setFileName(''); }}><X/></Button></div></div> : <div className={`upload-area ${drag ? 'dragging' : ''}`} onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); void upload(e.dataTransfer.files[0]); }}><Button variant="ghost" className="upload-button" onClick={() => fileInput.current?.click()}><span className="upload-icon"><ImagePlus size={22}/></span><span><strong>Drop a screenshot here, or <span className="text-primary">browse files</span></strong><small>PNG, JPG or WebP · Up to 5 MB</small></span></Button></div>}
  <div className="field-heading"><label htmlFor="situation">What happened?</label><span>{description.length}/6000</span></div><textarea id="situation" value={description} maxLength={6000} onChange={e => setDescription(e.target.value)} placeholder="Describe the situation. What was said or done, and what’s the context?" rows={4}/>
  <div className="example-row"><span>Try an example</span>{['Repeated spam','Borderline NSFW','DM advertising'].map((s,i) => <Button key={s} variant="ghost" size="sm" onClick={() => { setDescription(['A member repeatedly posted the same message in general chat after being asked to stop. This is their second offense.','A member posted a borderline NSFW meme in general chat. This is their first offense.','A member is sending unsolicited server invites to other members through DMs. This is their first offense.'][i] ?? ''); setOffense(i === 0 ? 2 : 1); setViolation(['SPAM / FLOOD / COPYPASTA','BORDERLINE NSFW','PRIVATE SELF PROMO / DM ADVERTISING'][i] ?? ''); }}>{s}<ArrowUpRight size={11}/></Button>)}</div>
  <div className="form-options"><div><label htmlFor="violation">Violation type</label><div className="select-wrap"><select id="violation" value={violation} onChange={e => setViolation(e.target.value)}><option value="">Auto-detect violation</option>{handbook.punishments.map(p => <option key={p.title}>{p.title}</option>)}</select><ChevronDown size={16}/></div></div><div><label>Offense number</label><div className="offense-selector">{[1,2,3,4,5,6].map(n => <Button key={n} size="sm" variant="ghost" aria-pressed={offense === n} className={offense === n ? 'selected' : ''} onClick={() => setOffense(n)}>{['1st','2nd','3rd','4th','5th','6th+'][n-1]}</Button>)}</div></div></div>
  <Button className="analyze-button" disabled={loading || (!description.trim() && !image)} onClick={() => void analyze()}>{loading ? <LoaderCircle className="animate-spin"/> : <Wand2/>}{loading ? 'Reviewing the situation…' : 'Get moderation guidance'}{!loading && <ArrowRight className="ml-auto"/>}</Button><p className="ai-disclaimer"><ShieldCheck size={13}/> AI advises. You make the final call.</p>
  {error && <div role="alert" className="error-message"><TriangleAlert size={18}/>{error}</div>}
  {result && <section className="analysis-result" aria-live="polite"><div className="flex items-center justify-between"><span className="eyebrow"><ShieldCheck size={16}/> MODERATION GUIDANCE</span><Button size="icon" variant="ghost" title="Copy guidance" aria-label="Copy guidance" onClick={async () => { try { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false),2000); } catch { setError('Clipboard unavailable. Select and copy the guidance instead.'); } }}>{copied ? <Check/> : <Copy/>}</Button></div><ReactMarkdown>{result}</ReactMarkdown></section>}
  {messages.length > 0 && (
   <section className="chat-section" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
    <div className="section-heading" style={{ marginBottom: '1rem' }}><span className="section-icon"><Wand2 size={21}/></span><div><h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Continue the conversation</h3><p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>Ask follow-up questions or upload more evidence</p></div></div>
    <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
     {messages.map((msg, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
       <div style={{ maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: '12px', background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-muted)', color: msg.role === 'user' ? 'var(--color-primary-foreground)' : 'inherit' }}>
        {msg.image && <img src={msg.image} alt="Evidence" style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: '0.5rem' }} />}
        {msg.role === 'assistant' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>}
       </div>
      </div>
     ))}
     {chatLoading && (
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
       <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: 'var(--color-muted)' }}>
        <LoaderCircle className="animate-spin" size={20} />
       </div>
      </div>
     )}
     <div ref={chatEndRef} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
     <input ref={chatFileInput} type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" aria-label="Upload screenshot" onChange={e => { void uploadChat(e.target.files?.[0]); e.target.value = ''; }}/>
     {chatImage && (
      <div className="image-preview" style={{ maxWidth: '200px' }}>
       <img src={chatImage} alt="Screenshot to upload" />
       <div><span>{chatFileName}</span><Button variant="ghost" size="icon" aria-label="Remove screenshot" onClick={() => { setChatImage(undefined); setChatFileName(''); }}><X/></Button></div>
      </div>
     )}
     <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
      <Button variant="outline" size="icon" onClick={() => chatFileInput.current?.click()} title="Upload screenshot"><ImagePlus size={20} /></Button>
      <textarea
       value={chatInput}
       onChange={e => setChatInput(e.target.value)}
       onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void sendChat(); } }}
       placeholder="Ask a follow-up question..."
       rows={2}
       style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)', resize: 'none', fontFamily: 'inherit', fontSize: '0.875rem' }}
      />
      <Button onClick={() => void sendChat()} disabled={chatLoading || (!chatInput.trim() && !chatImage)} size="icon"><Send size={20} /></Button>
     </div>
    </div>
   </section>
  )}
  </div></section>
  <aside className="reference-column"><div className="reference-heading"><BookOpen size={17}/><h3>Before you take action</h3></div><div className="checklist">{[['Get the full picture','Read the context, not just one message.'],['Keep it consistent','Follow the guide and offense history.'],['Save the evidence','Every action needs proof in the proof channel.'],['When in doubt, ask','Escalate serious or unclear cases to a manager.']].map(([title,copy],i) => <div key={title}><span className="check-number">0{i+1}</span><div><h4>{title}</h4><p>{copy}</p></div></div>)}</div>
  <div className="important-note"><TriangleAlert size={18}/><h4>A quick reminder</h4><p>Don’t punish from automod logs. The verbal warning has already been handled.</p><Link to="/staff-rules">Read staff rules <ArrowUpRight size={14}/></Link></div><div className="reference-divider"/><div className="reference-heading"><Scale size={17}/><h3>Need the exact rule?</h3></div><p className="reference-description">All violations. Every escalation.<br/>Your handbook is right here.</p><Button asChild variant="outline" className="w-full justify-between"><Link to="/punishments">Open punishment guide <ArrowUpRight/></Link></Button></aside></div>
  <section className="quick-links"><div><h3>Your handbook, at a glance</h3><p>The references you’ll reach for most.</p></div><div className="quick-link-grid">{[{ to: '/punishments' as const, icon: Scale, title: 'Punishment guide', copy: '14 violations & escalation steps', label: '14 RULES' },{ to: '/actions' as const, icon: ShieldCheck, title: 'Action reference', copy: 'From a verbal warning to a ban', label: '6 ACTIONS' },{ to: '/scenarios' as const, icon: BookOpen, title: 'Common scenarios', copy: 'Clear steps for tricky situations', label: '4 SCENARIOS' }].map(q => <Link to={q.to} key={q.to} className="quick-link"><div className="quick-link-top"><q.icon size={20}/><span>{q.label}</span><ArrowUpRight size={16}/></div><h4>{q.title}</h4><p>{q.copy}</p></Link>)}</div></section>
 </Workspace>;
}
