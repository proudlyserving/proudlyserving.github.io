#!/usr/bin/env bash
# Latin-only WOFF2 subsets of Public Sans for the site stylesheet.
# The full fonts stay in fonts/public-sans/ (used by assets/docs/proudly-serving.html).
# Requires: pip install fonttools brotli
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p fonts/public-sans/subset
for w in Light Regular Bold ExtraBold; do
  python3 -m fontTools.subset "fonts/public-sans/PublicSans-$w.woff2" \
    --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
    --layout-features='kern,liga,ccmp,locl,mark,mkmk' \
    --no-hinting --flavor=woff2 --output-file="fonts/public-sans/subset/PublicSans-$w.woff2"
done
ls -l fonts/public-sans/subset
