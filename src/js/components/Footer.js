import React from "react"
import Popup from 'react-popup'
import { contactPopup } from './popups'

export default class Footer extends React.Component {

  render() {
    return (
      <footer id="main-footer">
        <a target="_blank" href="https://www.producthunt.com/@teemofeev" className="click btn">product hunt</a>
        <a target="_blank" href="https://github.com/timadevelop/bindings#bindings" className="click btn">help</a>
        <a onClick={() => Popup.queue(contactPopup)} className="click btn">contact me</a>
      </footer>
    )
  }
}
