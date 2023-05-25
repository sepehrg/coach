// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

declare module 'react-html-email';
declare module 'react-countdown';
declare module '@starlord25/react-images-upload';
declare module '@buttercup/react-formatted-input';
declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.scss' {
  const content: Record<string, string>;
  export = content;
}
declare module '*.sass' {
  const content: Record<string, string>;
  export = content;
}
declare module '*.css' {
  const content: Record<string, string>;
  export = content;
}
declare module '*.gif' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_TOKEN: string;
  readonly VITE_CLIENT_ID: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
