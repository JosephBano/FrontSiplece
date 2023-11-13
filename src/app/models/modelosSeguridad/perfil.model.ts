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
export interface AddPermiso {
    CodigoPerfil: string;
    CodigoUsuario: string;
    CodigoInstitucion: string;
    CodigoSistema: string;
    ListCodigoOpciones: string;
}

export interface UpdatePermiso {
    UsuarioPerfil: string;
    ListCodigoOpciones: string;
}