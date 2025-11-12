/* eslint-disable */
// Type declarations for Vue single-file components so TypeScript/IDE won't complain
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
