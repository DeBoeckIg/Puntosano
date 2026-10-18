import type { ReactNode } from 'react';
import AdminBack from './AdminBack';

export default function AdminShell({ eyebrow, title, description, children, className = '', action }: { eyebrow: string; title: string; description: string; children: ReactNode; className?: string; action?: ReactNode }) {
  return <main className={`admin-shell ${className}`}><section className="admin-shell__card"><header className="admin-shell__header"><div className="admin-shell__heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="admin-shell__description">{description}</p></div><div className="admin-shell__actions">{action}<AdminBack /></div></header><div className="admin-shell__body">{children}</div></section></main>;
}
