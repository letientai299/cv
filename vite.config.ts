import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';

import mdx from '@mdx-js/rollup';

import remarkGfm from 'remark-gfm';
import remarkInlineLinks from 'remark-inline-links';

const mdxCfg = (): PluginOption => ({
  ...mdx({
    mdxExtensions: ['.mdx', '.md'],
    remarkPlugins: [remarkGfm, remarkInlineLinks],
  }),
  enforce: 'pre',
});

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), mdxCfg()],
  base: command === 'build' ? '/cv' : '',
}));
