import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Periodo } from '../models/periodo.model';
import { Institucion } from '../models/institucion.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private periodoActivo: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private nombreUsuario: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private institucionActual: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  getPeriodoActivo(): Observable<string> {
    return this.periodoActivo.asObservable();
  }
  
  getNombreUsuario(): Observable<string> {
    return this.nombreUsuario.asObservable();
  }
  
  getInstitucionActual(): Observable<string> {
    return this.institucionActual.asObservable();
  }


  actualizarPeriodoActivo(periodo: Periodo): void {
    const value = periodo.IdModelo ?? '';
    this.periodoActivo.next(value);
  }
  
  actualizarNombreUsuario(usuario: string): void {
    const value = usuario;
    this.nombreUsuario.next(usuario);
  }

  actualizarInstitucionActual(institucion: Institucion): void {
    const value = institucion.Detalle ?? '';
    this.institucionActual.next(value);
  }
}
