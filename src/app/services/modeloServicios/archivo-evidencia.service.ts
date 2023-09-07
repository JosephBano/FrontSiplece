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
    return this.http.get<ArchivoEvidencia[]>(this.API_URL + `/GetByEvidencia/${id}`);
  }

  PostArchivo(archivo: ArchivoEvidencia): Observable<ArchivoEvidencia> {
    return this.http.post<ArchivoEvidencia>(this.API_URL, archivo, this.httpOptions);
  }

  UpdateArchivo(archivo: ArchivoEvidencia): Observable<ArchivoEvidencia> {
    return this.http.put<ArchivoEvidencia>(this.API_URL, archivo, this.httpOptions);
  }

  DeleteArchivo(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
