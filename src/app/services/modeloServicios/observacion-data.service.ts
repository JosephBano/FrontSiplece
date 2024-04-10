import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservacionArchivo } from 'src/app/models/modelos-generales/observacion-data.model'; 
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ObservacionDataService {

  private readonly API_URL = environment.URL_BACKEND_OBSERVACIONARCHIVO; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  
  getObservaciones(): Observable<ObservacionArchivo[]> {
    return this.http.get<ObservacionArchivo[]>(this.API_URL);
  }

  postObservaciones(observacionArchivo: ObservacionArchivo): Observable<ObservacionArchivo> {
    return this.http.post<ObservacionArchivo>(this.API_URL, observacionArchivo, this.httpOptions);
  }

  postObservacion(observacion: any): Observable<any> {
    return this.http.post(this.API_URL, observacion);
  }
  updateObservaciones(observacionArchivo: ObservacionArchivo): Observable<ObservacionArchivo> {
    return this.http.put<ObservacionArchivo>(this.API_URL, observacionArchivo, this.httpOptions);
  }
  getObservacionByIdArchivoEvidencia(id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/GetObservacionByIdArchivoEvidencia/${id}`);
  }
  deleteObservacion(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/DeleteObservacionByIdArchivoEvidencia/${id}`);
  }
}




