import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Instituciones } from '../models/instituciones.model';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  /*private apiUrl = 'desconocido';
  constructor(private http: HttpClient) { }

  getInstituciones(): Observable<Instituciones[]> {
    return this.http.get<Instituciones[]>(this.apiUrl);
  }
  */

  private instituciones: Instituciones[] = [
    { id: '1', descripcion: 'Institucion 1' },
    { id: '2', descripcion: 'Institucion 2' },
    // Agrega más instituciones aquí si lo deseas
  ];

  constructor() { }

  getInstituciones(): Observable<Instituciones[]> {
    return of(this.instituciones);
  }
}
