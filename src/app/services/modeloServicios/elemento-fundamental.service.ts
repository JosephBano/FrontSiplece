import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ElementoFundamental } from 'src/app/models/modelos-generales/elemento-fundamental.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ElementoFundamentalService {
  private readonly API_URL = environment.URL_BACKEND_ELEMENTOFUNDAMENTAL; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getElementoFundamental(): Observable<ElementoFundamental[]> {
    return this.http.get<[]>(this.API_URL);
  }  

  getElementoFundamentalById(id: string): Observable<ElementoFundamental[]> {
    return this.http.get<[]>(`${this.API_URL}/FindOne/${id}`)
  }
  
  postElementoFundamental(indicador: ElementoFundamental): Observable<ElementoFundamental> {
    return this.http.post<ElementoFundamental>(this.API_URL, indicador, this.httpOptions);
  }
  
  updateElementoFundamental(indicador: ElementoFundamental): Observable<ElementoFundamental> {
    return this.http.put<ElementoFundamental>(this.API_URL, indicador, this.httpOptions);
  }
  
  deleteElementoFundamental(id: string): Observable<any> {
    return this.http.delete(this.API_URL + `/${id}`, this.httpOptions);
  }
}
