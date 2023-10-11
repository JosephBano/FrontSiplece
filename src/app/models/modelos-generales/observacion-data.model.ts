export interface ObservacionArchivo {
    IdObservacionArchivo?: string;
    IdArchivoEvidencia: string;
    UsuarioEvalua: string;
    Detalle: string;
    Estado?: string;
    FechaRegistro: string;
}
export interface ObservacionInformacion {
    IdObservacionInformacion?: string;
    IdFuenteInformacion: string;
    UsuarioEvalua: string;
    Detalle: string;
    Estado?: string;
    FechaRegistro: string;
}