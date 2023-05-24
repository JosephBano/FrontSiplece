import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCriterio } from '../models/subCriterios.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCriteriosService {

  private apiUrl = 'desconocido';

  constructor( private http: HttpClient) { }
  
  /*getCriterio(id: string): Observable<Criterio> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Criterio>(url);
  }*/

  private subCriterio: SubCriterio[] = [
    { id: '1', descripcion: 'SubCriterio 1', criterioId: '1' },
    { id: '2', descripcion: 'SubCriterio 2', criterioId: '2' },
  ];

  getSubCriterio(criterioId: string): Observable<SubCriterio[]> {
    const subCriterios = this.subCriterio.filter(m => m.criterioId === criterioId);
    return of(subCriterios);
  }
}
