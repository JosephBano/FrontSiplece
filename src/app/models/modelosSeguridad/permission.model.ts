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