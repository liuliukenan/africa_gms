/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_IMG_URL: string;
  readonly VITE_LICENSE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
