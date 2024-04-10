export interface ListaPermisoRespuesta{
    Id:number,
    Codigo?: string,
    Detalle: string,
    Padre?: number,
}
export interface ListaPermisoPeticion{
    codigoSistema: string
}

export interface NodoArbol {
    value: ListaPermisoRespuesta;
    children?: NodoArbol[];
}
export interface NodoFlat {
    expandable: boolean;
    value: ListaPermisoRespuesta;
    level: number;
}

export interface PermisosPeticion{
    codigoModelo: string,
    codigoPerfil: string,
    codigoEstado: string
}

export interface DeletePermiso{
    usuarioPerfil: string;
    idOpciones: string;
}