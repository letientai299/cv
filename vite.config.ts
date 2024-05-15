import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';

import mdx from '@mdx-js/rollup';

import remarkGfm from 'remark-gfm';
import remarkInlineLinks from 'remark-inline-links';

// https://vitejs.dev/config/
const mdxCfg = (): PluginOption => ({
  ...mdx({
    mdxExtensions: ['.mdx', '.md'],
    remarkPlugins: [remarkGfm, remarkInlineLinks],
    // rehypePlugins: [rehypeSlug],
  }),
  enforce: 'pre',
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdxCfg()],
  base: process.env.NODE_ENV === 'production' ? '/cv' : '',
});
