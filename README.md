# Proudly Serving: Public service with and for the people

* [Website](https://proudlyservingbook.com)
* [Documentation](https://github.com/proudlyserving/proudlyserving.github.io/wiki)
* [License](https://github.com/proudlyserving/proudlyserving.github.io/blob/main/LICENSE)

## Asset build

Jekyll does not need Node to build. Generated assets are committed; re-run these after changing the inputs:

* `npm run build:images` — WebP variants of `assets/img` (originals untouched)
* `npm run build:fonts` — Latin WOFF2 subsets in `fonts/public-sans/subset` (needs `pip install fonttools brotli`)
* `npm run build:css` — purges and minifies Bootstrap + `css/style.css` into `_includes/site.css`, which is inlined in `<head>`. Re-run after editing `css/style.css` or adding new Bootstrap classes to templates.
