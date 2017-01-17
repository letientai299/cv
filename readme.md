My CV, build with LaTeX and Gulp
================================

![Previews](./dist/preview.png)

If you just want to read my CV, here are the PDF:

- [Light theme](raw/master/dist/light.pdf), printer friendly.
- [Dark theme](raw/master/dist/dark.pdf), for night owl like me.


Feature
-------
- Live Reload: edit `*.tex` or `config.json` files and see the result immediately.
- Themeable: there's 2 theme currently, light and dark, and you can also tweak your own theme.


How to use the code
-------------------

### Prerequisites

- LaTeX. I recommend [MikTeX](https://miktex.org/) distribution.
- [Latexmk](http://mg.readthedocs.io/latexmk.html)
- Nodejs and NPM


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


### Available Gulp Tasks

- `gulp`, `gulp build`: Build PDF, put the output and intermediate files in `dest` folder.

- `gulp clean`: Delete `dest` folder.

- `gulp serve`: Provide live reload experience. 
  Gulp will build and open the PDF in your default reader.
  Then, it watch for `src` files changes, and rebuild the PDF. 
  The change will be picked up if your PDF reader is non-blocking.
  I suggest to use [zathura](https://pwmt.org/projects/zathura/) on Linux, 
  or [Sumatra](https://www.sumatrapdfreader.org/free-pdf-reader.html) on Windows.



Credit
------

- SVG Icons made by [Dave Gandy](http://www.flaticon.com/authors/dave-gandy) 
  and
  [Designerz Base](http://www.flaticon.com/authors/designerz-base) 
  from www.flaticon.com is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).
  However, CSS `fill` is added manually by me to enable color converting during build.

- Thanks Paul Gessler on [How can I produce the history graph of a Git repository in LaTeX?](http://tex.stackexchange.com/questions/125244/how-can-i-produce-the-history-graph-of-a-git-repository-in-latex/156501#156501) for the original tikz code.

License
-------

MIT


Shameless plug
--------------

I'm looking for a new job, willing to relocate. 
If you are interesting, kindly drop me a line.
