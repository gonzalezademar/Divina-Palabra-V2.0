import Link from 'next/link';
import { BookOpen, GraduationCap, Users, Compass, ClipboardList } from 'lucide-react';
import { InstitutionalLogo } from '@/components/common/InstitutionalLogo';
export default function WelcomePage(){
  const routes=[
    {href:'/setup',title:'Aprender a mi ritmo',text:'Elige una de las seis actividades. Puedes comenzar sin cuenta y sin reloj.',icon:Compass},
    {href:'/classroom',title:'Mis tareas',text:'Abre lo que preparó tu educador, guarda tus respuestas y consulta la devolución.',icon:ClipboardList},
    {href:'/teacher',title:'Soy educador',text:'Vincula alumnos, prepara tareas del catálogo y acompaña sus avances.',icon:GraduationCap},
    {href:'/encounters',title:'Participar con otra persona',text:'Cada uno en su dispositivo. Vincúlense por QR y acepten el encuentro.',icon:Users}
  ];
  return <main id="main-content" className="mx-auto max-w-4xl px-4 py-8 sm:py-12 space-y-7"><header className="learning-panel border-amber-500/30 space-y-5"><div className="flex items-center gap-4"><InstitutionalLogo className="h-16 w-16 shrink-0"/><div><p className="text-amber-200">Aprender de las Escrituras</p><h1 className="font-headline text-4xl font-bold">Divina Palabra</h1></div></div><p className="text-lg text-slate-200">Lee, comprende y repasa la Biblia, paso a paso. Equivocarte y pedir ayuda también forman parte del aprendizaje.</p><Link href="/setup" className="inline-flex items-center justify-center min-h-14 rounded-xl bg-amber-400 hover:bg-amber-300 px-6 py-3 font-bold text-slate-950">Comenzar una actividad</Link><p className="text-sm text-slate-300">Principiante · Intermedio · Avanzado. El nivel expresa conocimiento, no edad ni calidad de la fe.</p></header>
    <section aria-label="Qué quieres hacer" className="grid sm:grid-cols-2 gap-4">{routes.map(({href,title,text,icon:Icon})=><Link href={href} key={href} className="learning-panel hover:border-amber-400 focus-visible:outline-amber-400 space-y-3"><Icon aria-hidden="true" className="h-7 w-7 text-amber-300"/><h2 className="text-xl font-bold">{title}</h2><p className="text-slate-300">{text}</p><span className="block text-amber-200">Abrir →</span></Link>)}</section>
    <section className="learning-panel space-y-3"><h2 className="text-xl font-bold flex items-center gap-2"><BookOpen aria-hidden="true"/>Antes de empezar</h2><p>Las citas se identifican con su referencia y versión. Las explicaciones y reflexiones son ayudas educativas; conviene leer el pasaje completo en su contexto.</p><p>En las tareas no hay notas ni comparaciones públicas. En algunos encuentros se cuentan aciertos para mostrar un resultado claro.</p><div className="flex flex-wrap gap-5"><Link className="underline text-amber-200 py-2" href="/bible">Consultar la Biblia</Link><Link className="underline text-amber-200 py-2" href="/about">Cómo funciona y privacidad</Link></div></section>
  </main>;
}
