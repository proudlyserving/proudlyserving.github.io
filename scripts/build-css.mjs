// Builds the site's critical stylesheet: Bootstrap + css/style.css, purged to the
// selectors the templates actually use, then minified. The output is inlined in <head>
// by _includes/style.html, so there is no render-blocking CSS request.
import { PurgeCSS } from 'purgecss';
import { transform } from 'lightningcss';
import fs from 'node:fs';

const css = ['assets/bootstrap/css/bootstrap.min.css', 'css/style.css']
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n');

const [purged] = await new PurgeCSS().purge({
  content: [
    '_layouts/**/*.html',
    '_includes/**/*.html',
    '_pages/**/*.{md,html}',
    '_posts/**/*.md',
    '_contents/**/*.md',
    '_data/**/*.{json,yml}',
    'assets/js/**/*.js',
    'index.html',
  ],
  css: [{ raw: css }],
  safelist: {
    standard: ['show', 'collapse', 'collapsed', 'visually-hidden', 'visually-hidden-focusable'],
    greedy: [/^data-bs-theme/],
  },
  fontFace: true,
  keyframes: true,
  variables: false,
});

const { code } = transform({
  filename: 'site.css',
  code: Buffer.from(purged.css),
  minify: true,
});

fs.writeFileSync('_includes/site.css', code);
console.log(`site.css: ${(css.length / 1024).toFixed(0)}K -> ${(code.length / 1024).toFixed(1)}K`);
