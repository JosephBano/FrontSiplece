import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Instituciones } from '../models/instituciones.model';

@Injectable({
  providedIn: 'root'
})
export class SelectedInstitucionService {

  constructor() { }
  
  private institucionSubject = new BehaviorSubject<Instituciones | null>(null);

  institucion$ = this.institucionSubject.asObservable();

  setInstitucion(institucion: Instituciones | null) {
    this.institucionSubject.next(institucion);
  }
}
