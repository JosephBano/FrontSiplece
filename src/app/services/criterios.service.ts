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
  
  /*getCriterio(id: string): Observable<Criterio> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Criterio>(url);
  }*/

  private criterio: Criterio[] = [
    { id: '1', descripcion: 'Criterio 1', modeloId: '1' },
    { id: '2', descripcion: 'Criterio 2', modeloId: '2' },
  ];

  getCriterio(modeloId: string): Observable<Criterio[]> {
    const criterios = this.criterio.filter(m => m.modeloId === modeloId);
    return of(criterios);
  }
}
