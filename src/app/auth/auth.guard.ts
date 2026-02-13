import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  if (auth.isLoggedIn()) return true;

  // redirige a home pidiendo abrir el modal
  window.location.href = `/home?login=1&redirect=${encodeURIComponent(state.url)}`;
  return false;
};