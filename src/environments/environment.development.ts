const BASE_URL_SIPLECE = 'https://localhost:7094/api';
const BASE_URL_SEGURIDAD = 'https://localhost:7177/api';
const BASE_RUTA_PANEL = '/panel';
const BASE_RUTA_TABLAS = `${BASE_RUTA_PANEL}/tablas`;

export const environment = {
    /*Constantes del sistema*/
    NOMBRE_SISTEMA: "SIPLECE",
    /*Constantes SharedPoint Folder*/
    SHP_FOLDER_SITE_NAME: "SitioGrupo",
    SHP_FOLDER_LIST_NAME: "CACES_2023",
    /*Constantes SharedPointAPI*/
    SHP_API_GRANT_TYPE: "refresh_token",
    SHP_API_APP_ID: "00000003-0000-0ff1-ce00-000000000000",
    SHP_API_CLIENT_ID: "70a6eaa1-54ec-4ca0-b3dd-216ccfd51058",
    SHP_API_CLIENT_SECRET: "OXsrUMadzKKV0ltAUHkFthOb3tx9RySbmhQ67cuxWHo=",
    SHP_API_TENANT_NAME: "institutotraversari",
    SHP_REFRESH_TOKEN: "PAQABAAEAAAAtyolDObpQQ5VtlI4uGjEPCJLWaoUNE8llQh1idUJRZTTpyhEWEogzQFtsXlA5puAz0DOzTYfuk8cDQTbhTD-5npx2U8mxHaod5KB6TKb3NjdVLUzB8xWbl_tDMjNK7ctSCL85gVXsNK-6CxfvpGsV4VwD1dDVbcd83TwwCXpOGrLYVC79bupgJPsaxEsoDXlMBkli0eRnrHqqX79bTPz-dPFJbPZbhi_JWjtMa4GFP1b3etWP91LrNgnWgAPjRerbEDHIAhyOCDPyZeKgKhDnnhrgKymLiVNAEBZ1H5-HxyAA",
    /*URL's Controladores BackEnd */
    URL_BACKEND: BASE_URL_SIPLECE,
    URL_BACKEND_INSTITUCIONES: `${BASE_URL_SEGURIDAD}/Institucion`,
    URL_BACKEND_MODELO: `${BASE_URL_SEGURIDAD}/Modelo`,
    URL_BACKEND_CRITERIO: `${BASE_URL_SIPLECE}/Criterio`,
    URL_BACKEND_SUBCRITERIO: `${BASE_URL_SIPLECE}/Subcriterio`,
    URL_BACKEND_INDICADOR: `${BASE_URL_SIPLECE}/Indicador`,
    URL_BACKEND_VALORACION: `${BASE_URL_SIPLECE}/Valoracion`,
    URL_BACKEND_INDICADORVALORACION: `${BASE_URL_SIPLECE}/IndicadorValoracion`,
    URL_BACKEND_ELEMENTOFUNDAMENTAL: `${BASE_URL_SIPLECE}/ElementoFundamental`,
    URL_BACKEND_TIPOEVALUACION: `${BASE_URL_SIPLECE}/TipoEvaluacion`,
    URL_BACKEND_PERIODO: `${BASE_URL_SIPLECE}/Periodo`,
    URL_BACKEND_PONDERACION: `${BASE_URL_SIPLECE}/Ponderacion`,
    URL_BACKEND_EVIDENCIA: `${BASE_URL_SIPLECE}/Evidencia`,
    URL_BACKEND_ARCHIVOEVIDENCIA: `${BASE_URL_SIPLECE}/ArchivoEvidencia`,

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
    /*URL's Controlador seguridad */
    URL_SEGURIDAD: BASE_URL_SEGURIDAD,
    URL_SEG_TOKEN: `${BASE_URL_SEGURIDAD}/Token`,
    URL_SEG_USUARIOS: `${BASE_URL_SEGURIDAD}/Usuario`,
    URL_SEG_PERFIL: `${BASE_URL_SEGURIDAD}/Perfil`,
    URL_SEG_COMPONENTE: `${BASE_URL_SEGURIDAD}/Componente`,
};