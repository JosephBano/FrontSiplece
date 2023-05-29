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

  private instituciones: Instituciones[] = [
    { id: '1', descripcion: 'Institucion 1' },
    { id: '2', descripcion: 'Institucion 2' },
  ];
  
  getInstituciones(): Observable<Instituciones[]> {
    return of(this.instituciones);
  }

}
