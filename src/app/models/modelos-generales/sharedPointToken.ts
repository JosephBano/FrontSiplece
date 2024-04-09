export interface ObtenerTokenRequest {
    GrantType?: string;
    ApplicationId?: string;
    ClientId?: string;
    ClientSecret?: string;
    TenantName?: string;
    RefreshToken?: string;
}
export interface ObtenerTokenResponse {
    AccessToken?: string;
    Code?: number;
    Message: string;
}
export interface AgregarArchivoRequest {
    TenantName?: string;
    SiteName?: string;
    ListName?: string;
    FileName?: string;
    AccessToken?: string;
    FileBase64?: any;
}
export interface AgregarArchivoResponse {
    Code?: number;
    Message: string;
    PathUrl?: string;
}
export interface AgregarPathRequest {
    PathUrl?: string;
    IdArchivoEvidencia?: number;
    CodigoUsuario?: string;
    Detalle?: string;
}