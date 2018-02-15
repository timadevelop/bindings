## Bindings
[bindings.](https://timadevelop.github.io/bindings/) is a simple ReactJS app.
It allows you to import, change or export keymap bindings in popular editors as Atom, Sublime Text, vim and other.

__basic usage scenario is:__ import keymap file from popular editor (or `csv/json` key-value), look at key bindings, change some binding, convert it to a other representation (atom/vim/sublime or alias)

![in action](./samples/bindings.gif)

## Bindings File Formats

for assuring proper converting use following file formats.
you can find sample files for some file types in `/samples` directory

- `.alias` - bash alias (You can import/export `.alias` file)
```bash
alias g='git'
alias ga='git add'
alias gaa='git add --all'
alias gapa='git add --patch'
alias gau='git add --update'
alias gap='git apply'
alias gb='git branch'
```

- `.atom` or `.cson` - Atom editor (atom uses CSON)
```cson
'atom-text-editor':
	'ctrl+v': 'paste'
	'ctrl+c': 'copy'
	'ctrl-f': 'find'
```

- `.csv` - CSV format
```csv
Key,Value
g,git
ga,git add
gaa,git add --all
gapa,git add --patch
gau,git add --update
gba,git branch -a
```

- `.json` - basic JSON format
```json
[{"key":"g","value":"git"},{"key":"ga","value":"git add"},
{"key":"gaa","value":"git add --all"},
{"key":"gapa","value":"git add --patch"},
{"key":"gau","value":"git add --update"},
{"key":"gap","value":"git apply"}
]
or
[
{"key":"key1","value":"1"},
{"key":"Ctrl+V","value":"paste"},{"key":"k2","value":"k3"},
{"key":"131452","value":"23564"}]
```

- `.sublime` - Sublime Text 3
```json
[
	{ "keys": ["key1"], "command": "1" }
,	{ "keys": ["ctrl+v"], "command": "paste" }
,	{ "keys": ["k2"], "command": "k3" }
,	{ "keys": ["131452"], "command": "23564" }
]
```

not implemented yet :
- `.vim` - vim maps
- `.vs` - Visual Studio
- `.eclipse` - Eclipse

---

see changelog in the root of the repo
