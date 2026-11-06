import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

function inlineOfflineBundle(outputDir: string): Plugin {
  return {
    name: 'inline-offline-bundle',
    apply: 'build',
    async closeBundle() {
      const outputPath = resolve(process.cwd(), outputDir);
      const htmlPath = resolve(outputPath, 'index.html');
      let html = await readFile(htmlPath, 'utf8');

      const getAssetPath = (assetUrl: string) => {
        const relativePath = assetUrl.replace(/^\.?\//, '');
        const assetPath = resolve(outputPath, relativePath);

        if (!assetPath.startsWith(`${outputPath}${sep}`)) {
          throw new Error(`Build asset is outside the offline output folder: ${assetUrl}`);
        }

        return assetPath;
      };

      const scripts = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/gi)];
      const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/gi)];

      if (scripts.length !== 1 || stylesheets.length !== 1) {
        throw new Error('Expected one JavaScript bundle and one stylesheet for the offline build.');
      }

      const scriptTag = scripts[0][0];
      const scriptPath = getAssetPath(scripts[0][1]);
      const script = (await readFile(scriptPath, 'utf8')).replace(/<\/script/gi, '<\\/script');
      html = html.replace(scriptTag, () => `<script type="module">${script}</script>`);

      const stylesheetTag = stylesheets[0][0];
      const stylesheetUrl = /\bhref="([^"]+)"/i.exec(stylesheetTag)?.[1];

      if (!stylesheetUrl) {
        throw new Error('The offline build stylesheet link has no asset path.');
      }

      const stylesheetPath = getAssetPath(stylesheetUrl);
      const stylesheet = await readFile(stylesheetPath, 'utf8');
      html = html.replace(stylesheetTag, () => `<style>${stylesheet}</style>`);
      html = html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/gi, '');

      await writeFile(htmlPath, html, 'utf8');
      await rm(resolve(outputPath, 'assets'), { recursive: true, force: true });
    }
  };
}

export default defineConfig(({ mode }) => {
  const offlineBuild = mode === 'offline';
  const outputDir = 'dist-offline';

  return {
    base: offlineBuild ? './' : '/',
    publicDir: offlineBuild ? false : 'public',
    plugins: [
      react(),
      tailwindcss(),
      ...(offlineBuild ? [inlineOfflineBundle(outputDir)] : [])
    ],
    resolve: {
      alias: {
        '@': resolve(process.cwd(), '.')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {}
    },
    ...(offlineBuild
      ? {
          build: {
            outDir: outputDir,
            emptyOutDir: true,
            assetsInlineLimit: 10_000_000,
            cssCodeSplit: false,
            modulePreload: {
              polyfill: false
            },
            sourcemap: false,
            rollupOptions: {
              output: {
                inlineDynamicImports: true
              }
            }
          }
        }
      : {})
  };
});
