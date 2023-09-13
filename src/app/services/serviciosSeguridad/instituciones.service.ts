import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Institucion } from '../../models/modelosSeguridad/institucion.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  private readonly API_URL = environment.URL_BACKEND_INSTITUCIONES; 

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