import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instituciones } from '../models/instituciones.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  private readonly API_URL = ''; 

  constructor(private http: HttpClient) { }

  /*getInstituciones(): Observable<Instituciones[]> {
    return this.http.get<Instituciones[]>(`${this.API_URL}/instituciones`);
  }*/
  private instituciones: Instituciones[] = [
    { id: '1', descripcion: 'Institucion 1' },
    { id: '2', descripcion: 'Institucion 2' },
  ];
  
  getInstituciones(): Observable<Instituciones[]> {
    return of(this.instituciones);
  }

  agregarInstitucion(institucion: Instituciones): Observable<Instituciones> {
    return this.http.post<Instituciones>(`${this.API_URL}/instituciones`, institucion);
  }

  editarInstitucion(institucion: Instituciones): Observable<Instituciones> {
    return this.http.put<Instituciones>(`${this.API_URL}/instituciones/${institucion.id}`, institucion);
  }

  eliminarInstitucion(id: string): Observable<{}> {
    return this.http.delete(`${this.API_URL}/instituciones/${id}`);
  }
}
