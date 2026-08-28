/// <reference types="vite/client" />
interface ImportMetaEnv { readonly VITE_USE_MOCK_CATALOG?: string; readonly VITE_WHATSAPP_NUMBER?: string }
interface ImportMeta { readonly env: ImportMetaEnv }
