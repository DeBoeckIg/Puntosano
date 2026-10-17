import { StrictMode } from 'react'; import { createRoot } from 'react-dom/client'; import './styles.css'; import './hero-overrides.css'; import App from './App';
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
if ('serviceWorker' in navigator && (window.isSecureContext || location.hostname === 'localhost')) navigator.serviceWorker.register('/sw.js', { scope: '/admin' }).catch(() => undefined);
