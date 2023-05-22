import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instituciones } from '../models/instituciones.model';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {

  private apiUrl = 'desconocido';
  constructor(private http: HttpClient) { }

  getOptions(): Observable<Instituciones[]> {
    return this.http.get<Instituciones[]>(this.apiUrl);
  }
}
