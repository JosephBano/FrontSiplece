import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Valoracion } from 'src/app/models/modelos-generales/valoracion.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  private readonly API_URL = environment.URL_BACKEND_VALORACION; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getValoracion(): Observable<Valoracion[]> {
    return this.http.get<[]>(this.API_URL);
  }  

  getValoracionById(id: string): Observable<Valoracion[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`)
  }
  
  postValoracion(indicador: Valoracion): Observable<Valoracion> {
    return this.http.post<Valoracion>(this.API_URL, indicador, this.httpOptions);
  }
  
  updateValoracion(indicador: Valoracion): Observable<Valoracion> {
    return this.http.put<Valoracion>(this.API_URL, indicador, this.httpOptions);
  }
  
  deleteValoracion(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
