export interface PermisoRespuesta {
    codigoRol: string,
    codigoPermiso: string
}
export interface PermisoPeticion {        
    codigoModelo: string,
    codigoPerfil: string,
    codigoEstado: string,
    codigoSistema: string
}
export interface RolPerfil {
    id: number;
    rol: string;
}