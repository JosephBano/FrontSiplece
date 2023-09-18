import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PermisoPeticion, PermisoRespuesta } from "src/app/models/modelosSeguridad/perfil.model";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private readonly API_URL = environment.URL_SEGURIDAD;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    constructor(private http: HttpClient) { }
    
    getPermisos(datos: PermisoPeticion): Observable<PermisoRespuesta[]> {
        return this.http.post<PermisoRespuesta[]>(`${this.API_URL}/Perfil/permisos`, datos, this.httpOptions);
    }
}