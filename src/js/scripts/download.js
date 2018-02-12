import {convertToCSV, convertToSublime} from './convert'

function exportCSVFile(headers, items, fileTitle="bindings", as="csv") {
    if (as !== "json" && as !== "sublime" && headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);
    var exportedFilename = fileTitle + '.' + as;

    var blob;
    switch (as) {
      case "json":
        blob = new Blob([jsonObject], { type: 'text/json;charset=utf-8;' });
        break;
      case "sublime":
        var o = convertToSublime(jsonObject);
        blob = new Blob([o], { type: 'text;charset=utf-8;' });
        break;
      default:
        var csv = convertToCSV(jsonObject);
        blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    }

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
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
  var headers = {
      key: 'Key'.replace(/,/g, ''), // remove commas to avoid errors
      value: "Value".replace(/,/g, ''),
  };
  var itemsFormatted = [];

  // format the data
  itemsNotFormatted.forEach((item) => {
      itemsFormatted.push({
          key: item.key.replace(/,/g, ''), // remove commas to avoid errors,
          value: item.value.replace(/,/g, ''),
      });
  });

  exportCSVFile(headers, itemsFormatted, fileTitle, as); // call the exportCSVFile() function to process the JSON and trigger the download
}
