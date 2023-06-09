import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCriterio } from '../../models/subCriterio.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCriteriosService {

  private readonly API_URL = 'https://localhost:7094/api/SubCriterio'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getSubCriterio(): Observable<SubCriterio[]> {
    return this.http.get<SubCriterio[]>(this.API_URL);
  }  

  getSubCriterioById(id: string): Observable<SubCriterio> {
    return this.http.get<SubCriterio>(this.API_URL + `/FindOne/${id}`);
  }

  postSubCriterio(subcriterio: SubCriterio): Observable<SubCriterio> {
    return this.http.post<SubCriterio>(this.API_URL, subcriterio, this.httpOptions);
  }

  updateSubCriterio(subcriterio: SubCriterio): Observable<SubCriterio> {
    return this.http.put<SubCriterio>(this.API_URL, subcriterio, this.httpOptions);
  }

  deleteSubCriterio(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
