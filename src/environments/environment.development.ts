export const environment = {
    /*URL's Controladores BackEnd */
    URL_BACKEND: 'https://localhost:7094/api',
    URL_BACKEND_INSTITUCIONES: 'https://localhost:7094/api/Institucion',
    URL_BACKEND_MODELO: 'https://localhost:7094/api/Modelo',
    URL_BACKEND_CRITERIO: 'https://localhost:7094/api/Criterio',
    URL_BACKEND_SUBCRITERIO: 'https://localhost:7094/api/Subcriterio',
    URL_BACKEND_INDICADOR: 'https://localhost:7094/api/Indicador',
    URL_BACKEND_VALORACION: 'https://localhost:7094/api/Valoracion',
    URL_BACKEND_INDICADORVALORACION: 'https://localhost:7094/api/IndicadorValoracion',
    URL_BACKEND_ELEMENTOFUNDAMENTAL: 'https://localhost:7094/api/ElementoFundamental',
    URL_BACKEND_TIPOEVALUACION: 'https://localhost:7094/api/TipoEvaluacion',
    URL_BACKEND_PERIODO: 'https://localhost:7094/api/Periodo',
    URL_BACKEND_PONDERACION: 'https://localhost:7094/api/Ponderacion',
    URL_BACKEND_EVIDENCIA: 'https://localhost:7094/api/Evidencia',
    URL_BACKEND_ARCHIVOEVIDENCIA: 'https://localhost:7094/api/ArchivoEvidencia',


    /*Rutas Generales*/
    RUTA_INICIO: '/inicio',
    RUTA_PANEL: '/panel',
        /*Rutas panel*/
        RUTA_TABLAS: '/panel/tablas',
            /*Rutas hijas tablas*/
            RUTA_PANEL_TAB_MODELO: '/panel/tablas/modelo',
            RUTA_PANEL_TAB_CRITERIO: '/panel/tablas/criterio',
            RUTA_PANEL_TAB_SUBCRITERIO: '/panel/tablas/subcriterio',
            RUTA_PANEL_TAB_INDICADOR: '/panel/tablas/indicador',
            RUTA_PANEL_TAB_ELEMENTO: '/panel/tablas/elementos',
            RUTA_PANEL_TAB_EVIDENCIA: '/panel/tablas/evidencias',
        RUTA_PANEL_CONFIG: '/panel/configuracion',
        RUTA_PANEL_PARAMETROS: '/panel/parametros',
        RUTA_PANEL_EVIDENCIAS: '/panel/evidencias',
            /*Rutas hijas evidencias */
            RUTA_PANEL_EV_DETALLE: '/panel/evidencias/detalle/:',
};