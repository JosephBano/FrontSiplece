import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private apiUrl = 'desconocido';

  constructor(private http: HttpClient) { }

  getModelos(institucionId: string): Observable<Modelo[]> { // Asume que necesitas un ID de institución para obtener los modelos
    return this.http.get<Modelo[]>(`${this.apiUrl}/${institucionId}`); // reemplaza esto con la URL correcta de tu API
  }
}
