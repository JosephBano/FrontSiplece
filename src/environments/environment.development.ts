const BASE_URL = 'https://localhost:7094/api';
const BASE_RUTA_PANEL = '/panel';
const BASE_RUTA_TABLAS = `${BASE_RUTA_PANEL}/tablas`;

export const environment = {
    /*URL's Controladores BackEnd */
    URL_BACKEND: BASE_URL,
    URL_BACKEND_INSTITUCIONES: `${BASE_URL}/Institucion`,
    URL_BACKEND_MODELO: `${BASE_URL}/Modelo`,
    URL_BACKEND_CRITERIO: `${BASE_URL}/Criterio`,
    URL_BACKEND_SUBCRITERIO: `${BASE_URL}/Subcriterio`,
    URL_BACKEND_INDICADOR: `${BASE_URL}/Indicador`,
    URL_BACKEND_VALORACION: `${BASE_URL}/Valoracion`,
    URL_BACKEND_INDICADORVALORACION: `${BASE_URL}/IndicadorValoracion`,
    URL_BACKEND_ELEMENTOFUNDAMENTAL: `${BASE_URL}/ElementoFundamental`,
    URL_BACKEND_TIPOEVALUACION: `${BASE_URL}/TipoEvaluacion`,
    URL_BACKEND_PERIODO: `${BASE_URL}/Periodo`,
    URL_BACKEND_PONDERACION: `${BASE_URL}/Ponderacion`,
    URL_BACKEND_EVIDENCIA: `${BASE_URL}/Evidencia`,
    URL_BACKEND_ARCHIVOEVIDENCIA: `${BASE_URL}/ArchivoEvidencia`,

    /*Rutas Generales*/
    RUTA_INICIO: '/inicio',
    RUTA_PANEL: BASE_RUTA_PANEL,
        /*Rutas panel*/
        RUTA_TABLAS: BASE_RUTA_TABLAS,
            /*Rutas hijas tablas*/
            RUTA_PANEL_TAB_MODELO: `${BASE_RUTA_TABLAS}/modelo`,
            RUTA_PANEL_TAB_CRITERIO: `${BASE_RUTA_TABLAS}/criterio`,
            RUTA_PANEL_TAB_SUBCRITERIO: `${BASE_RUTA_TABLAS}/subcriterio`,
            RUTA_PANEL_TAB_INDICADOR: `${BASE_RUTA_TABLAS}/indicador`,
            RUTA_PANEL_TAB_ELEMENTO: `${BASE_RUTA_TABLAS}/elementos`,
            RUTA_PANEL_TAB_EVIDENCIA: `${BASE_RUTA_TABLAS}/evidencias`,
        RUTA_PANEL_CONFIG: `${BASE_RUTA_PANEL}/configuracion`,
        RUTA_PANEL_PARAMETROS: `${BASE_RUTA_PANEL}/parametros`,
        RUTA_PANEL_EVIDENCIAS: `${BASE_RUTA_PANEL}/evidencias`,
            /*Rutas hijas evidencias */
            RUTA_PANEL_EV_DETALLE: `${BASE_RUTA_PANEL}/evidencias/detalle/:`,
};