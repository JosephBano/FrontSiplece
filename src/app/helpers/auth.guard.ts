import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const routes = inject(Router);
  if(loginService.getTokenOfLocalStorage()) return true
  else {
    routes.navigate(["/inicio"]);
    return false;
  }
};
