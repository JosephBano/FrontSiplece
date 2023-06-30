import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Criterio } from '../../models/criterio.model';
import { Modelo } from 'src/app/models/modelo.model';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {

  private readonly API_URL = 'https://localhost:7094/api/Criterio'; 
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }
  
  getCriterios(): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(this.API_URL);
  }

  getCriterioById(id: string): Observable<Criterio> {
    return this.http.get<Criterio>(this.API_URL + `/FindOne/${id}`);
  }

  postCriterios(criterio: Criterio): Observable<Criterio> {
    return this.http.post<Criterio>(this.API_URL, criterio, this.httpOptions);
  }

  updateCriterio(criterio: Criterio): Observable<Criterio> {
    return this.http.put<Modelo>(this.API_URL, criterio, this.httpOptions);
  }

  deleteCriterio(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
