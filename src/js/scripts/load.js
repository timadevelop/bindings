import keyBindingsStore from "../KeyBindingsStore"

//let csv is the CSV file with headers
function csvJSON(csv) {

  let lines=csv.split("\n");

  let result = [];

  let headers=lines[0].split(",");

  for(let i=1;i<lines.length-1;i++){

	  let obj = {};
	  let currentline=lines[i].split(",");
    // console.log(currentline);
	  for(let j=0;j<headers.length;j++){
      console.log(currentline[j]);
		  obj[headers[j]] = format(currentline[j]);
	  }
    // console.log(obj);

	  result.push(obj);

  }

  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}

function format(s) {
  return s.replace(/\r/g, '');//.replace(/\r/g, '')
}

function load (resultString, fileType) {
  // getters for (key, value) of bindings for map function
  let getKey = obj => obj.key;
  let getValue = obj => obj.value;

  switch (fileType) {
    case "json":
      getKey = (obj) => obj.key;
      getValue = (obj) => obj.value;
      break;
    case "sublime":
      getKey = (obj) => obj.keys[0];
      getValue = (obj) => obj.command;
      break;
    case "csv":
      getKey = (obj) => obj.Key;
      getValue = (obj) => obj[Object.keys(obj)[1]]; // TODO BUG
      // loadCSV(resultString);
      break;
    default:
      throw new Error("Sorry, " + fileType + " is not supported yet. If you really want to use this format - write me on timadevelop@gmail.com");

  }

  // hide import menu
  keyBindingsStore.showImportMenu = !keyBindingsStore.showImportMenu;

  // getJSON array from string
  let arr = fileType === "csv" ? csvJSON(resultString) : JSON.parse(resultString);
  // remove all bindings from list
  keyBindingsStore.clear();
  // push new bindings
  arr.forEach(o =>
    keyBindingsStore.pushNew(format(getKey(o)), format(getValue(o)))
  );

}


export { load }
