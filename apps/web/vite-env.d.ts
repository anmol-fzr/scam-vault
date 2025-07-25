/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_DEV_SERVER_URL: string;
  VITE_APP_DEV_PROD_URL: string;
  VITE_APP_MODE: "DEV" | "PROD"
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
