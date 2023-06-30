import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Institucion } from '../../models/institucion.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  private readonly API_URL = 'https://localhost:7094/api/Institucion'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getInstituciones(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(this.API_URL);
  }
  
  getInstitucioneById(id: string): Observable<Institucion[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`);
  }

  postInstitucion(institucion: Institucion): Observable<Institucion> {
    return this.http.post<Institucion>(this.API_URL, institucion, this.httpOptions);
  }

  updateInstitucion(institucion: Institucion): Observable<Institucion> {
    return this.http.put<Institucion>(this.API_URL, institucion, this.httpOptions);
  }

  deleteInstitucion(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
  
}