import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private apiUrl = 'desconocida';

  constructor(private http: HttpClient) { }

  getModelos(institucionId: string): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.apiUrl}/${institucionId}`);
  }


  agregarModelo(modelo: Modelo): Observable<any> {
    return this.http.post(this.apiUrl, modelo);
  }

  editarModelo(modelo: Modelo): Observable<any> {
    const url = `${this.apiUrl}/${modelo.id}`;
    return this.http.put(url, modelo);
  }

  eliminarModelo(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
  
 }

 