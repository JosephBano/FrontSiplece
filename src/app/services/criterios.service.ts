import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Criterio } from '../models/criterios.model';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {

  private apiUrl = 'desconocido';

  constructor( private http: HttpClient) { }
  
  /*getCriteriosPorId(id: string): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(`${this.apiUrl}/criterios?modeloId=${id}`);
  }*/

  private criterios: Criterio[] = [
    { id: '1', descripcion: 'Criterio 1', modeloId: '1' },
    { id: '2', descripcion: 'Criterio 2', modeloId: '2' },
  ];

  getCriterio(id: string): Observable<Criterio[]> {
    const criteriosPorId = this.criterios.filter(criterio => criterio.modeloId === id);
    return of(criteriosPorId);
  }
}
