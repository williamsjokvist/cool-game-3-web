interface ImportMetaEnv {
  readonly SERVER_URL: string;
  readonly PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}