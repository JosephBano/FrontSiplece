import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";
import { FuentesInformacion } from "src/app/models/modelos-generales/fuentes-informacion";

@Injectable({
    providedIn: 'root'
})

export class FuentesInformacionService {
    private readonly API_URL = environment.URL_BACKEND_FUENTEINFORMACION;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };

    constructor(private http: HttpClient) {}

    GetAll(): Observable<FuentesInformacion[]>{
        return this.http.get<FuentesInformacion[]>(this.API_URL);
    }
}