import "../css/main.css"
import "../css/popup.css"
import React from "react"
import ReactDOM from "react-dom"
import KeyBindingsList from "./KeyBindingsList"
import KeyBindingsStore from "./KeyBindingsStore"

const app = document.getElementById("app")

ReactDOM.render(<KeyBindingsList store={KeyBindingsStore} />, app)
