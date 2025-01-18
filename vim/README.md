color habamax
syntax on

set number
set hlsearch
set nobackup
set autoindent
set ignorecase
set noeb

set tabstop=2
set shiftwidth=2
set clipboard=unnamed
set showmatch

cnoreabbrev Tab Tabularize 

nnoremap ` .
nnoremap - $
nnoremap \\ o<Esc>
nnoremap <BS> kdd
nnoremap <Tab> >>
nnoremap <S-Tab> <<
nnoremap <Space> <C-w>
nnoremap <Space>n :vnew<CR>
nnoremap <Space>` :NERDTreeToggle<CR>
nnoremap md :InstantMarkdownPreview<CR>
nnoremap tt :TableFormat<CR>

inoremap ( ()<Esc>i
inoremap [ []<Esc>i
inoremap { {}<Esc>i
inoremap < <><Esc>i
inoremap `` <Esc>

call plug#begin()

    Plug 'tpope/vim-fugitive'
    Plug 'tpope/vim-sensible'
    Plug 'preservim/nerdtree'
    Plug 'mhinz/vim-startify'
    Plug 'godlygeek/tabular'
    Plug 'preservim/vim-markdown'
    Plug 'instant-markdown/vim-instant-markdown',{'for':'markdown','do':'yarn install'}
    Plug 'prettier/vim-prettier',{'do':'yarn install --frozen-lock --production'}

call plug#end()

"""""""""""""""""""""""
"
" vim-instant-markdown
"
"""""""""""""""""""""""
let g:instant_markdown_theme = 'dark'
let g:instant_markdown_slow = 1
let g:instant_markdown_autoscroll = 1
let g:instant_markdown_autostart = 0

"""""""""""""""""""""""
"
" prettier
"
"""""""""""""""""""""""
let g:prettier#autoformat = 1

"""""""""""""""""""""""
"
" vim-markdown
"
"""""""""""""""""""""""
let g:vim_markdown_toc_autofit = 1
let g:vim_markdown_borderless_table = 1
let g:vim_markdown_folding_disabled = 1
