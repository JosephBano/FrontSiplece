import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ArchivoEvidencia } from 'src/app/models/modelos-generales/archivo-evidencia.model';

@Injectable({
  providedIn: 'root'
})
export class ArchivoEvidenciaService {

  private readonly API_URL = environment.URL_BACKEND_ARCHIVOEVIDENCIA; 
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private http: HttpClient ) { }

  GetByEvidencia(id: string): Observable<ArchivoEvidencia[]> {
    return this.http.get<ArchivoEvidencia[]>(environment.URL_BACKEND_ARCHIVOEVIDENCIA + `/GetByEvidencia/${id}`);
  }
}
