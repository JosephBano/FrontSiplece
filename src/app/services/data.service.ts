import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { Indicador } from '../models/modelos-generales/indicador.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private activeListOrder1: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private activeListOrder2: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  getActiveLiOrder1(): Observable<string> {
    return this.activeListOrder1.asObservable();
  }

  getActiveLiOrder2(): Observable<string> {
    return this.activeListOrder2.asObservable();
  }

  actualizarActiveLiOrder1(nuevoValor: any): void {
    this.activeListOrder1.next(nuevoValor);
  }
  
  actualizarActiveLiOrder2(nuevoValor: any): void {
    this.activeListOrder2.next(nuevoValor);
  }
}
