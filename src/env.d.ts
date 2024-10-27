/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 在这里定义其他环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
