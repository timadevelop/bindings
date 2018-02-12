import React from "react"

import download from "../scripts/download"

export default class ExportMenu extends React.Component {
  downloadBindings (as)
  {
    try {
        download(this.props.data, as);
    } catch (e) {
      alert(e);
    } finally {
    }
  }

  render() {
    return (

      <li>
        <div className="left">
        <span>export as</span>
        <span className="click btn" onClick={this.downloadBindings.bind(this, "json")}>json</span>
        <span className="click btn" onClick={this.downloadBindings.bind(this, "csv")}>csv</span>
        <span className="click btn disabled">vim</span>
        <span className="click btn disabled">atom</span>
        <span className="click btn" onClick={this.downloadBindings.bind(this, "sublime")}>sublime text 3</span>
        <span className="click btn disabled">vs</span>
        <span className="click btn disabled">eclipse</span>
        <span className="click btn disabled">alias</span>
        </div>
      </li>
    )
  }
}
