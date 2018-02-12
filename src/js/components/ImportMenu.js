import React from "react"

import { FileSelector } from "./FileSelector"

export default class ImportMenu extends React.Component {

  render() {
    return (
      <li>
        <div className="inlineElements">
          <span>import from</span>
          <FileSelector />
        </div>
      </li>
    )
  }
}
