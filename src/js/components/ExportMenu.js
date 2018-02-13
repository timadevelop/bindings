import React from "react"
import ReactDom from 'react-dom'
import download from "../scripts/download"
import Popup from 'react-popup'

import { notImplementedPopup } from './popups'

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

  popup()
  {
    Popup.queue(notImplementedPopup)
  }

  render() {

    return (
      <li>

      <Popup />

        <div className="left">
        <span>export as</span>
        <span className="click btn" onClick={this.downloadBindings.bind(this, "json")}>json</span>
        <span className="click btn" onClick={this.downloadBindings.bind(this, "csv")}>csv</span>
        <span className="click btn disabled" onClick={this.popup.bind(this)}>vim</span>
        <span className="click btn disabled" onClick={this.popup.bind(this)}>atom</span>
        <span className="click btn" onClick={this.downloadBindings.bind(this, "sublime")}>sublime text 3</span>
        <span className="click btn disabled" onClick={this.popup.bind(this)}>vs</span>
        <span className="click btn disabled" onClick={this.popup.bind(this)}>eclipse</span>
        <span className="click btn disabled" onClick={this.popup.bind(this)}>alias</span>
        </div>
      </li>
    )
  }
}
