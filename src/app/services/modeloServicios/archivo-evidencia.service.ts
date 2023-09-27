import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ArchivoEvidencia } from 'src/app/models/modelos-generales/archivo-evidencia.model';
import { AgregarArchivoRequest, AgregarArchivoResponse, AgregarPathRequest, ObtenerTokenRequest, ObtenerTokenResponse } from 'src/app/models/modelos-generales/sharedPointToken';

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
    return this.http.get<ArchivoEvidencia[]>(`${this.API_URL}/GetByEvidencia/${id}`);
  }

  GetByEvidenciaUser(id: string, user: string): Observable<ArchivoEvidencia[]> {
    return this.http.get<ArchivoEvidencia[]>(`${this.API_URL}/GetByEvidenciaUser?IdEvidencia=${id}&CodeUser=${user}`);
  }

  GetTokenSharedPoint(obtenerToken: ObtenerTokenRequest): Observable<ObtenerTokenResponse>{
    return this.http.post<ObtenerTokenResponse>(`${this.API_URL}/Token`,obtenerToken);
  }

  AddFileSharedPoint(agregarArchivo: AgregarArchivoRequest): Observable<AgregarArchivoResponse>{
    return this.http.post<AgregarArchivoResponse>(`${this.API_URL}/AddFile`,agregarArchivo)
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
  PostFile(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/SaveEvidence`, formData)
  }

  SaveFile(agregarpath: AgregarPathRequest): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/SaveFile`, agregarpath)
  }
}
