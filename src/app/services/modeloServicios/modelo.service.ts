import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../../models/modelo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private modelos: Modelo[] = [
    { id: '1', descripcion: 'Modelo 1', institucionId: '1' },
    { id: '2', descripcion: 'Modelo 2', institucionId: '1' },
    { id: '3', descripcion: 'Modelo 3', institucionId: '2' },
    { id: '4', descripcion: 'Modelo 4', institucionId: '2' },
  ];
  constructor(private http: HttpClient) { }

  /*getModelo(id: string): Observable<Modelo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Modelo>(url);
  }*/
  getModelos(institucionId: string): Observable<Modelo[]> {
    const modelos = this.modelos.filter(m => m.institucionId === institucionId);
    return of(modelos);
  }

}