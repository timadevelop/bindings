## Bindings
[bindings.](#) is a simple ReactJS app.
It allows you to import, change or export keymap bindings in popular editors as Atom, Sublime Text, vim and other.

__basic usage scenario is:__ import keymap file from popular editor (or JSON key-value), look at key bindings, change some binding, convert it to a JSON representation (to the keymap file for some editor)

## Bindings File Formats

for assuring proper converting use following file formats.
- `.json` - basic JSON format (You can import/export `.json` file)
```json
[
{"key":"key1","value":"1"},
{"key":"Ctrl+V","value":"paste"},{"key":"k2","value":"k3"},
{"key":"131452","value":"23564"}]
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

- `.sublime` - Sublime Text 3
```json
[
	{ "keys": ["key1"], "command": "1" }
,	{ "keys": ["ctrl+v"], "command": "paste" }
,	{ "keys": ["k2"], "command": "k3" }
,	{ "keys": ["131452"], "command": "23564" }
]
```
- `.atom` or `.cson` - Atom editor (atom uses CSON)
```cson
'atom-text-editor':
	'ctrl+v': 'paste'
	'ctrl+c': 'copy'
	'ctrl-f': 'find'
```

- `.alias` - bash alias
```bash
alias g='git'
alias ga='git add'
alias gaa='git add --all'
alias gapa='git add --patch'
alias gau='git add --update'
alias gap='git apply'
alias gb='git branch'
```
- `.vim` - vim maps
```
not implemented yet :(
```
- `.vs` - Visual Studio
- `.eclipse` - Eclipse
