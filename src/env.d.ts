declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
    readonly NG_APP_AZURE_AD_CLIENT_ID: string;
    readonly NG_APP_AZURE_AD_AUTHORITY: string;
  }
}
