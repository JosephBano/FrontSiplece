import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../../models/modelo.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private readonly API_URL = 'https://localhost:7094/api/Modelo'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.API_URL);
  }  

  postModelo(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(this.API_URL, modelo, this.httpOptions);
  }
  
  //Getbyid
  getModelosIdInstitucion(id: string): Observable<Modelo[]> {
    return this.getModelos().pipe(
      map(modelos => modelos.filter(e => e.idInstitucion?.toString() === id))
    );
  }
}