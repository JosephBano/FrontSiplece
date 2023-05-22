import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

 /* private apiUrl = 'desconocido';

  constructor(private http: HttpClient) { }

  getModelos(institucionId: string): Observable<Modelo[]> { 
    return this.http.get<Modelo[]>(`${this.apiUrl}/${institucionId}`); 
  }
  */
  private modelos: { [key: string]: Modelo[] } = {
    '1': [
      { id: '1', descripcion: 'Modelo 1' },
      { id: '2', descripcion: 'Modelo 2' },
    ],
    '2': [ 
      { id: '3', descripcion: 'Modelo 3' },
      { id: '4', descripcion: 'Modelo 4' },
    ],
  };

  constructor() { }

  getModelos(institucionId: string): Observable<Modelo[]> {
    return of(this.modelos[institucionId] || []);
  }
 }
