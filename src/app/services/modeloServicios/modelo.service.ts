import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../../models/modelo.model';
import { Observable, map } from 'rxjs';
import { UpdateService } from '../update-service.service';

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

  getModeloById(id: string): Observable<Modelo> {
    return this.http.get<Modelo>(this.API_URL + `/FindOne/${id}`);
  }

  postModelo(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(this.API_URL, modelo, this.httpOptions);
  }

  updateModelo(modelo: Modelo): Observable<Modelo> {
    return this.http.put<Modelo>(this.API_URL, modelo, this.httpOptions);
  }

  deleteModelo(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
  
}