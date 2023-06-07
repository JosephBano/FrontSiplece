import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Instituciones } from '../../models/instituciones.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  private readonly API_URL = 'https://localhost:7094/api/Institucion'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getInstituciones(): Observable<Instituciones[]> {
    return this.http.get<Instituciones[]>(this.API_URL);
  }

  postInstitucion(institucion: Instituciones): Observable<Instituciones> {
    return this.http.post<Instituciones>(this.API_URL, institucion, this.httpOptions);
  }
}