// CSV
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    // console.log(array[1].key);

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','
            // console.log(array[i][index]);
            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

//
// sublime
//
/* http://docs.sublimetext.info/en/latest/customization/key_bindings.html?highlight=map
[
   { "keys": ["ctrl+shift+n"], "command": "new_window" },
   { "keys": ["ctrl+o"], "command": "prompt_open_file" }
]
*/
function convertToSublime(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    console.log(array);
    const str = array.map(binding =>
      '\t{ \"keys\": [\"' + binding.key.replace(/\n/g, "").toLowerCase() + '\"], "command": \"'
       + binding.value.replace(/\n/g, "").toLowerCase() + '\" }\r\n'
     );

     console.log(str);
    return '[\r\n' + str + ']';
}


// atom
/*
'atom-text-editor':
  'ctrl-alt-l': 'editor:auto-indent'
*/
// 
// function convertAtom(objArray) {
//     var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
//     console.log(array);
//     const str = array.map(binding =>
//       '\t{ \"keys\": [\"' + binding.key.replace(/\n/g, "").toLowerCase() + '\"], "command": \"'
//        + binding.value.replace(/\n/g, "").toLowerCase() + '\" }\r\n'
//      );
//
//      console.log(str);
//     return "'atom-text-editor':\n" + str + ']';
// }

// vim
// https://hea-www.harvard.edu/~fine/Tech/vi.html
// http://learnvimscriptthehardway.stevelosh.com/chapters/03.html


// brackets
// https://github.com/adobe/brackets/wiki/User-Key-Bindings

// VS
// eclipse




export {convertToCSV, convertToSublime}
