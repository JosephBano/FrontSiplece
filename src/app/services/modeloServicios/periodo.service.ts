import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Periodo } from 'src/app/models/periodo.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private readonly API_URL = 'https://localhost:7094/api/Periodo'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getPeriodo(): Observable<Periodo[]> {
    return this.http.get<[]>(this.API_URL);
  }  

  getPeriodoById(id: string): Observable<Periodo[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`)
  }
  
  postPeriodo(Periodo: Periodo): Observable<Periodo> {
    return this.http.post<Periodo>(this.API_URL, Periodo, this.httpOptions);
  }
  
  updatePeriodo(Periodo: Periodo): Observable<Periodo> {
    return this.http.put<Periodo>(this.API_URL, Periodo, this.httpOptions);
  }
  
  deletePeriodo(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
