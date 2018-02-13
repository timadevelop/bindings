import {convertToCSV, convertToSublime, convertToAtom, convertToAlias} from './convert'

function exportCSVFile(headers, items, fileTitle="bindings", as="csv") {
    if (as === "csv" && headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    let jsonObject = JSON.stringify(items);
    as = (as === 'atom' ? 'cson' : as);
    let exportedFilename = fileTitle + '.' + as;

    let blob, o;
    switch (as) {
      case "json":
        blob = new Blob([jsonObject], { type: 'text/json;charset=utf-8;' });
        break;
      case "alias":
        o = convertToAlias(jsonObject);
        blob = new Blob([o], { type: 'text;charset=utf-8;' });
        break;
      case "sublime":
        o = convertToSublime(jsonObject);
        blob = new Blob([o], { type: 'text;charset=utf-8;' });
        break;
      case "cson":
        o = convertToAtom(jsonObject);
        blob = new Blob([o], { type: 'text;charset=utf-8;' });
        break;
      default:
        o = convertToCSV(jsonObject);
        blob = new Blob([o], { type: 'text/csv;charset=utf-8;' });
    }

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        let link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            let url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export default function download(itemsNotFormatted, as, fileTitle='bindings'){
  if (itemsNotFormatted.length < 1)
  {
    throw new Error("There is nothing to export, add some bindings :)");
  }
  let headers = {
      key: 'Key'.replace(/,/g, ''), // remove commas to avoid errors
      value: "Value".replace(/,/g, ''),
  };
  let itemsFormatted = [];

  // format the data
  itemsNotFormatted.forEach((item) => {
      itemsFormatted.push({
          key: item.key.replace(/,/g, ''), // remove commas to avoid errors,
          value: item.value.replace(/,/g, ''),
      });
  });

  exportCSVFile(headers, itemsFormatted, fileTitle, as); // call the exportCSVFile() function to process the JSON and trigger the download
}
