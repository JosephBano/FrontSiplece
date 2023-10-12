export interface Usuario {
    idUsuario?: string;
    codigoAd: string;
    correo: string;
    nombre: string;
    apellido: string;
    rol: string;
    contrasenia: string;
    activo: string;
}

export interface UsuarioRolPeticion {
    codigoUsuario: string;
    codigoSistema: string;
    codigoInstitucion: string;
}
export interface UsuarioRolRespuesta {
    codigoAd: string;
    codigoPerfil: string;
    codigoSistema: string;
    codigoInstitucion: string;
    codigoPeriodo: string;
    mensaje?: string;
}