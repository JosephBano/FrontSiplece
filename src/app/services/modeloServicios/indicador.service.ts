import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Indicador } from '../../models/modelos-generales/indicador.model';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {

  private readonly API_URL = environment.URL_BACKEND_INDICADOR; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getIndicador(): Observable<Indicador[]> {
    return this.http.get<[]>(this.API_URL);
  }  

  getIndicadorById(id: string): Observable<Indicador[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`)
  }
  
  postIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.post<Indicador>(this.API_URL, indicador, this.httpOptions);
  }
  
  updateIndicador(indicador: Indicador): Observable<Indicador> {
    return this.http.put<Indicador>(this.API_URL, indicador, this.httpOptions);
  }
  
  deleteIndicador(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
