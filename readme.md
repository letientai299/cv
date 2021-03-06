# My Resume, build with LaTeX and Gulp

![Previews](./dist/preview.png)

If you just want to read my Resume, here are the PDF:

- [Light theme](./dist/light.pdf), printer friendly.
- [Dark theme](./dist/dark.pdf), for night owl like me.

## Feature

- Live Reload: edit `*.tex` or `config.json` files and see the result immediately.
- Themeable: there's 2 theme currently, light and dark, and you can also tweak your own theme.

## How to use the code

### Prerequisites

^-^ LaTeX. I recommend [MikTeX](https://miktex.org/) distribution for Windows. If
you use TeXLive, you'll need 2016 distribution.

- [Latexmk](http://mg.readthedocs.io/latexmk.html)
- Nodejs

### Guide

- Fork and clone this repo.
- Install all the packages listed in [`src/main.tex`](src/main.tex) and its dependencies, too.
  On Linux, you can try `python texliveonfly.py src/main.tex` to auto install missing LaTeX
  packages. But that method won't always work as expected. And I haven't tried it on Window.
- Install npm dependencies: `npm install`.
- Install gulp globally (if you have not done this before): `npm install -g gulp`.
- Run `gulp build`.
- If everything ok, you should have `dest/main.pdf` to view.
- If not, mostly the cause is missing LaTeX packages.
  `cd dest`, then run `latexmk`. Its output will help to find out the missing packages.
- Run `gulp build` and check file `dest/main.pdf`
- Run `gulp serve` to start writing. The pdf should appear for previewing.

### Available Gulp Tasks

- `gulp`, `gulp build`: Build PDF, put the output and intermediate files in `dest` folder.

- `gulp clean`: Delete `dest` folder.

- `gulp serve`: Provide live reload experience.
  Gulp will build and open the PDF in your default reader.
  Then, it watch for `src` files changes, and rebuild the PDF.
  The change will be picked up if your PDF reader is non-blocking.
  I suggest to use [zathura](https://pwmt.org/projects/zathura/) on Linux,
  or [Sumatra](https://www.sumatrapdfreader.org/free-pdf-reader.html) on Windows.

## Misc

[![Tai's github stats](https://github-readme-stats.vercel.app/api?username=letientai299)](https://github.com/anuraghazra/github-readme-stats)

## License

MIT
