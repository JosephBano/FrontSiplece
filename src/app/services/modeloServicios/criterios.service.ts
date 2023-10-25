import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Criterio, ListChild } from '../../models/modelos-generales/criterio.model';
import { environment } from 'src/environments/environment.development';
import { ListaPermisoRespuesta } from 'src/app/models/modelosSeguridad/permission.model';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {

  private readonly API_URL = environment.URL_BACKEND_CRITERIO; 
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }
  
  getCriterios(): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(this.API_URL);
  }

  getByModelo(id: string): Observable<Criterio[]> {
    return this.http.get<Criterio[]>(this.API_URL + `/GetByModelo/${id}`);
  }

  getAllByModelo(id: string): Observable<ListaPermisoRespuesta[]> {
    return this.http.get<ListaPermisoRespuesta[]>(`${this.API_URL}/AllComponents?IdModelo=${id}`);
  }

  getCriterioById(id: string): Observable<Criterio> {
    return this.http.get<Criterio>(this.API_URL + `/FindOne/${id}`);
  }

  getChild(code: string): Observable<ListChild[]> {
    return this.http.get<ListChild[]>(`${this.API_URL}/AllChild?CodigoCriterio=${code}`);
  }

  postCriterios(criterio: Criterio): Observable<Criterio> {
    return this.http.post<Criterio>(this.API_URL, criterio, this.httpOptions);
  }

  updateCriterio(criterio: Criterio): Observable<Criterio> {
    return this.http.put<Criterio>(this.API_URL, criterio, this.httpOptions);
  }

  deleteCriterio(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
