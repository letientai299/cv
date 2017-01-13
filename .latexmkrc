# vim:set et sw=2 ts=2 tw=79 ft=conf:

$pdf_mode = 1;        # tex -> pdf

# Main entry
@default_files = ('main.tex');

# Commands are copied from TexStudio, with shell-escape enabled
# for code highlighting using minted
$latex = 'latex -src -interaction=nonstopmode -shell-escape';
$pdflatex = 'pdflatex -synctex=1 -interaction=nonstopmode -shell-escape';

$out_dir='build'
