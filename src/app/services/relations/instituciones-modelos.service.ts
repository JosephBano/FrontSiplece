import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesModelosService {

  constructor() { }

  private seleccionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public seleccion$: Observable<string> = this.seleccionSubject.asObservable();

  actualizarSeleccion(opcion: string): void {
    this.seleccionSubject.next(opcion);
  }
}
