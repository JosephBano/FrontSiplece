import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEvaluacion } from 'src/app/models/modelos-generales/tipo-evaluacion.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TipoEvaluacionService {

  private readonly API_URL = environment.URL_BACKEND_TIPOEVALUACION; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getTipoEvaluacion(): Observable<TipoEvaluacion[]> {
    return this.http.get<[]>(this.API_URL);
  }  

  getTipoEvaluacionById(id: string): Observable<TipoEvaluacion[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`)
  }
  
  postTipoEvaluacion(indicador: TipoEvaluacion): Observable<TipoEvaluacion> {
    return this.http.post<TipoEvaluacion>(this.API_URL, indicador, this.httpOptions);
  }
  
  updateTipoEvaluacion(indicador: TipoEvaluacion): Observable<TipoEvaluacion> {
    return this.http.put<TipoEvaluacion>(this.API_URL, indicador, this.httpOptions);
  }
  
  deleteTipoEvaluacion(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
