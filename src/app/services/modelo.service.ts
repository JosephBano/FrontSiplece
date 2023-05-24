import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  
  private apiUrl = 'desconocido'; // Cambia esto a tu URL real

  private modelos: Modelo[] = [
    { id: '1', descripcion: 'Modelo 1', institucionId: '1' },
    { id: '2', descripcion: 'Modelo 2', institucionId: '1' },
  ];
  constructor(private http: HttpClient) { }

  /*getModelo(id: string): Observable<Modelo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Modelo>(url);
  }*/
  getModelo(institucionId: string): Observable<Modelo[]> {
    const modelos = this.modelos.filter(m => m.institucionId === institucionId);
    return of(modelos);
  }

  agregarModelo(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(this.apiUrl, modelo);
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