import AdminPushSetup from './AdminPushSetup';
import * as api from './client';
import { showNotification } from './notifications';

const navigate = (path: string) => { history.pushState({}, '', path); dispatchEvent(new PopStateEvent('popstate')); };

export default function AdminMenu() {
  const logout = async () => {
    try { await api.adminLogout(); }
    catch (error) { showNotification(api.toUserMessage(error, 'session')); }
    finally { navigate('/admin/login'); }
  };
  const links = [['/admin/catalog', 'Catálogo', 'Gestioná productos y categorías.'], ['/admin/carousel', 'Carrusel', 'Administrá las imágenes destacadas de portada.'], ['/admin/orders', 'Pedidos', 'Consultá y actualizá los pedidos.'], ['/admin/statistics', 'Estadísticas', 'Revisá ventas, pendientes y stock.'], ['/admin/change-password', 'Contraseña', 'Actualizá tu contraseña de acceso.']];
  return <><AdminPushSetup /><nav className="admin-grid admin-menu" aria-label="Menú de administración">{links.map(([path, title, description]) => <a href={path} key={path} onClick={event => { event.preventDefault(); navigate(path); }}><b>{title}</b><span>{description}</span></a>)}</nav><button className="button admin-logout" type="button" onClick={() => void logout()}>Cerrar sesión</button></>;
}
