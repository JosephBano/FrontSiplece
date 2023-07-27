import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ponderacion } from 'src/app/models/ponderacion.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PonderacionService {
  private readonly API_URL = environment.URL_BACKEND_PONDERACION; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getPonderacion(): Observable<Ponderacion[]> {
    return this.http.get<[]>(this.API_URL);
  }  

  getPonderacionById(id: string): Observable<Ponderacion[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`)
  }
  
  postPonderacion(indicador: Ponderacion): Observable<Ponderacion> {
    return this.http.post<Ponderacion>(this.API_URL, indicador, this.httpOptions);
  }
  
  updatePonderacion(indicador: Ponderacion): Observable<Ponderacion> {
    return this.http.put<Ponderacion>(this.API_URL, indicador, this.httpOptions);
  }
  
  deletePonderacion(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
