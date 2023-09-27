import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private readonly API_URL = environment.URL_BACKEND_REPORTE; 

  constructor(private http: HttpClient) { }

  downloadReport() {
    return this.http.get(this.API_URL, { responseType: 'blob' });
  }

}

  
  