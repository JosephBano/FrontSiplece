import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Criterio } from '../../models/criterios.model';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {

  private criterios: Criterio[] = [
    { id: '1', descripcion: 'Criterio 1', modeloId: '1'},
    { id: '2', descripcion: 'Criterio 2', modeloId: '1'},
    { id: '3', descripcion: 'Criterio 3', modeloId: '2'},
    { id: '4', descripcion: 'Criterio 4', modeloId: '2'},
    { id: '5', descripcion: 'Criterio 5', modeloId: '3'},
    { id: '6', descripcion: 'Criterio 6', modeloId: '3'},
    { id: '7', descripcion: 'Criterio 7', modeloId: '4'},
    { id: '8', descripcion: 'Criterio 8', modeloId: '4'},
  ];
  getCriterios(modelosId: string): Observable<Criterio[]> {
    const criterio = this.criterios.filter(c => c.modeloId === modelosId);
    return of(criterio);
  }

  postCriterios(criterio: Criterio): Observable<Criterio[]> {
    this.criterios.push(criterio);
    return of(this.criterios);
  }
}
