import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router); 
  const perfil = inject(LoginService).getTokenDecoded();
  if(perfil) return true;
  else {
    routes.navigate(["/inicio"]);
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const perfil = inject(DataService).nombrePerfil();
  if(perfil === 'SUPADMIN') return true;
  else {
    routes.navigate(["/panel"]);
    return false;
  }
};

export const supervisorGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const perfil = inject(DataService).nombrePerfil();
  if(perfil === 'SUPADMIN') return true;
  if(perfil === 'SUPERVISOR') return true;
  else {
    routes.navigate(["/panel"]);
    return false;
  }
};

export const encargadoGuard: CanActivateFn = (route, state) => {
  const routes = inject(Router);
  const perfil = inject(DataService).nombrePerfil();
  if(perfil === 'SUPADMIN') return true;
  if(perfil === 'ENCARGADO') return true;
  else {
    routes.navigate(["/panel"]);
    return false;
  }
};
