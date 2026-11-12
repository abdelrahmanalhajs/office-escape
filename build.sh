#!/bin/bash
# builds docs/ (GitHub Pages copy) from index.html + games/
cd "$(dirname "$0")"
{ printf '<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<link rel="icon" href="icon.svg">\n<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}[hidden]{display:none!important}img{max-width:100%%}body{margin:0}</style>\n</head>\n<body>\n'; cat index.html; printf '\n</body>\n</html>\n'; } > docs/index.html
rm -rf docs/games; cp -R games docs/games; touch docs/.nojekyll
[ -f logo.png ] && cp logo.png docs/logo.png
[ -d sounds ] && { rm -rf docs/sounds; cp -R sounds docs/sounds; }
true
