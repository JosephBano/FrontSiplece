import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Instituciones } from '../../models/instituciones.model';
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

  getInstituciones(): Observable<Instituciones[]> {
    return this.http.get<Instituciones[]>(this.API_URL);
  }
  
  getInstitucioneById(id: string): Observable<Instituciones[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`);
  }

  postInstitucion(institucion: Instituciones): Observable<Instituciones> {
    return this.http.post<Instituciones>(this.API_URL, institucion, this.httpOptions);
  }

  updateInstitucion(institucion: Instituciones): Observable<Instituciones> {
    return this.http.put<Instituciones>(this.API_URL, institucion, this.httpOptions);
  }

  deleteInstitucion(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
  
}