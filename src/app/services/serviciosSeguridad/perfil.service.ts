import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddPermiso, PermisoPeticion, PermisoRespuesta, UpdatePermiso } from "src/app/models/modelosSeguridad/perfil.model";
import { environment } from "src/environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private readonly API_URL = environment.URL_SEG_PERFIL;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    constructor(private http: HttpClient) { }
    
    getPermisos(datos: PermisoPeticion): Observable<PermisoRespuesta[]> {
        return this.http.post<PermisoRespuesta[]>(`${this.API_URL}/permisos`, datos, this.httpOptions);
    }

    addPermisos(datos: AddPermiso):Observable<number[]> {
        return this.http.post<number[]>(`${this.API_URL}/agregarPermisos`, datos, this.httpOptions);
    }

    updatePermisos(datos: UpdatePermiso):Observable<number[]> {
        return this.http.post<number[]>(`${this.API_URL}/actualizarPermisos`, datos, this.httpOptions);
    }
}