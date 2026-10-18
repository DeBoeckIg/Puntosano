let toastTimer = 0;

export function showNotification(message: string): void {
  document.querySelectorAll('.toast').forEach(toast => toast.remove());
  const element = document.createElement('div');
  element.className = 'toast';
  element.setAttribute('role', 'status');
  element.setAttribute('aria-live', 'polite');
  element.textContent = message;
  document.body.appendChild(element);
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => element.remove(), 2500);
}

export function clearNotification(): void {
  window.clearTimeout(toastTimer);
  document.querySelectorAll('.toast').forEach(toast => toast.remove());
}
