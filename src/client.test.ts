import { describe, expect, it } from 'vitest';
import { ApiError, toUserMessage } from './client';

const technicalDetails = /ApiError|TypeError|fetch|network|csrf|stack|500|401|403|409|413/i;

function expectSafeMessage(message: string) {
  expect(message).toMatch(/[áéíóúñü]/i);
  expect(message).not.toMatch(technicalDetails);
}

describe('toUserMessage', () => {
  it('translates network errors without exposing technical details', () => {
    const message = toUserMessage(new TypeError('Failed to fetch'), 'catalog');

    expect(message).toBe('No pudimos conectar con el servicio. Revisá tu conexión e intentá nuevamente.');
    expectSafeMessage(message);
  });

  it('uses the login message for unauthorized login attempts', () => {
    const message = toUserMessage(new ApiError(401, { detail: 'invalid credentials' }), 'login');

    expect(message).toBe('Usuario o contraseña incorrectos.');
    expectSafeMessage(message);
  });

  it('explains that an authenticated session is required for forbidden access', () => {
    const message = toUserMessage(new ApiError(403, { detail: 'permission denied' }), 'session');

    expect(message).toBe('Tu sesión venció o no tenés permisos. Iniciá sesión nuevamente.');
    expectSafeMessage(message);
  });

  it('explains why a category with products cannot be deleted', () => {
    const message = toUserMessage(new ApiError(409, { code: 'CATEGORY_HAS_PRODUCTS' }), 'category-delete');

    expect(message).toBe('La categoría no puede ser eliminada: Motivo: tiene productos asociados. Reasigna para eliminar.');
    expectSafeMessage(message);
  });

  it('asks customers to verify an already submitted checkout', () => {
    const message = toUserMessage(new ApiError(409, {}), 'checkout');

    expect(message).toBe('El pedido ya fue enviado. Verificá tus pedidos antes de intentar nuevamente.');
    expectSafeMessage(message);
  });

  it('reports oversized files in user-facing language', () => {
    const message = toUserMessage(new ApiError(413, {}), 'image-upload');

    expect(message).toBe('El archivo es demasiado grande. Elegí una imagen más liviana.');
    expectSafeMessage(message);
  });

  it('reports temporary server failures without the status code', () => {
    const message = toUserMessage(new ApiError(500, { error: 'database unavailable' }), 'catalog');

    expect(message).toBe('El servicio no está disponible ahora. Intentá nuevamente más tarde.');
    expectSafeMessage(message);
  });

  it('handles validation codes with a correction prompt', () => {
    const message = toUserMessage({ data: { code: 'VALIDATION_ERROR' } }, 'product-create');

    expect(message).toBe('Revisá los datos ingresados e intentá nuevamente.');
    expectSafeMessage(message);
  });

  it('preserves partial-save context for supported product changes', () => {
    const message = toUserMessage(new Error('unexpected response'), 'product-update');

    expect(message).toBe('La información principal se guardó, pero faltó completar parte de los cambios. Recargá y verificá el producto antes de continuar.');
    expectSafeMessage(message);
  });

  it('falls back to the context-specific generic message', () => {
    const message = toUserMessage(new Error('unexpected response'), 'category-create');

    expect(message).toBe('No pudimos crear la categoría.');
    expectSafeMessage(message);
  });
});
