import { ArrowLeft } from 'lucide-react';

export default function AdminBack() {
  const navigate = () => {
    if (typeof window !== 'undefined' && typeof (window as any).__rocioGo === 'function') {
      (window as any).__rocioGo('/admin');
      return;
    }
    window.history.pushState({}, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return <a className="admin-back" href="/admin" onClick={event => { event.preventDefault(); navigate(); }}><ArrowLeft aria-hidden="true" /><span>Volver al panel</span></a>;
}
