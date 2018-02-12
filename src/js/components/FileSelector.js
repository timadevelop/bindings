import React from "react";

import { load } from "../scripts/load.js"

function getFormat(fileName) {
  return fileName.split('.')[1]
}

export class FileSelector extends React.Component
{
    constructor(props: any)
    {
        super(props);
        // this.reader = new FileReader();
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e)
    {

       const file = e.target.files[0];
       if (file) {
           // create reader
           var reader = new FileReader();
           reader.readAsText(file);
           reader.onload = function(e) {
               // browser completed reading file - display it
              //  try {
                 load(e.target.result, getFormat(file.name));
              //  } catch (err) {
                //  alert(err);
              //  } finally {

              //  }
           };
       }
    }

    render ()
    {
        return <div>
            <input id="myFile" type="file" onChange={ (e) => this.handleChange(e) } />
        </div>;
    }
}
