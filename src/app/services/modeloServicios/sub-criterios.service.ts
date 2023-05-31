import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCriterio } from '../../models/subCriterios.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCriteriosService {

  private subCriterio: SubCriterio[] = [
    { id: '1', descripcion: 'SubCriterio 1', criterioId: '1' },
    { id: '2', descripcion: 'SubCriterio 2', criterioId: '1' },
    { id: '3', descripcion: 'SubCriterio 3', criterioId: '2' },
    { id: '4', descripcion: 'SubCriterio 4', criterioId: '2' },
    { id: '5', descripcion: 'SubCriterio 5', criterioId: '3' },
    { id: '6', descripcion: 'SubCriterio 6', criterioId: '3' },
    { id: '7', descripcion: 'SubCriterio 7', criterioId: '4' },
    { id: '8', descripcion: 'SubCriterio 8', criterioId: '4' },
    { id: '9', descripcion: 'SubCriterio 9', criterioId: '5' },
    { id: '10', descripcion: 'SubCriterio 10', criterioId: '5' },
    { id: '11', descripcion: 'SubCriterio 11', criterioId: '6' },
    { id: '12', descripcion: 'SubCriterio 12', criterioId: '6' },
    { id: '13', descripcion: 'SubCriterio 13', criterioId: '7' },
    { id: '14', descripcion: 'SubCriterio 14', criterioId: '7' },
    { id: '15', descripcion: 'SubCriterio 15', criterioId: '8' },
    { id: '16', descripcion: 'SubCriterio 16', criterioId: '8' },
  ];

  constructor( private http: HttpClient) { }
  
  /*getSubCriterio(id: string): Observable<Criterio> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<Criterio>(url);
  }*/

  getSubCriterio(criterioId: string): Observable<SubCriterio[]> {
    const subCriterio = this.subCriterio.filter(e => e.criterioId === criterioId);
    return of(subCriterio);
  }
}
