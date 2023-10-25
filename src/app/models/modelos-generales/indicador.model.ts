export interface Indicador {
    IdIndicador?: string;
    CodigoIndicador: string;
    IdSubCriterio: string;
    IdTipoEvaluacion: string;
    Detalle?: string;
    Orden: string;
    Activo?: string;
    Valoracion?: string;
    Estandar?: string;
}

export interface ListChild {
    listP: string
}
export interface ListFather {
    listP: string
}