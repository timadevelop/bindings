import React from "react"
import { observer } from "mobx-react"

import ExportMenu from "./components/ExportMenu"
import ImportMenu from "./components/ImportMenu"
import Footer from "./components/Footer"

@observer
export default class KeyBindingsList extends React.Component {
  constructor() {
    super();
    this.state = {
      key : "key", value : "command",
      showExportMenu: false,
      showImportMenu: false
    }
  }

  createNew() {
    this.props.store.createBinding(this.state.key, this.state.value)
  }

  // if enter key pressed - create new binding
  createIfEnter(e)  {
    e.which == 13 ? this.props.store.pushNew(this.state.key, this.state.value) : 0
  }

  // filter bindings
  filter(e) {
    this.props.store.filter = e.target.value.replace(/([^\\])\+/g, '$1\\\+');
  }

  // remove by binding by id
  clearById (id)
  {
    this.props.store.clearById(id)
  }

  clearAll()
  {
    this.props.store.clear();
  }

  toogleExportMenu () {
    // this.setState({showExportMenu: !this.state.showExportMenu})
    this.props.store.showExportMenu = !this.props.store.showExportMenu;
  }

  toogleImportMenu() {
    // this.setState({showImportMenu: !this.state.showImportMenu})
    this.props.store.showImportMenu = !this.props.store.showImportMenu;
  }

  generateBindingsLis(bindings) {
    return bindings.map(binding => (
      <li key={binding.id}>
        <div className="left">
          <span className="click" onClick={this.clearById.bind(this, binding.id)}>&#10008;</span>
          <input type="text" name="key" className="key" value={binding.key}
                onChange={(e) => binding.key = e.target.value}/>
        </div>
        <div className="right">
          <input type="text" name="value" className="value" value={binding.value}
                onKeyPress={this.createIfEnter.bind(this)}
                onChange={(e) => binding.value = e.target.value}
          />
        </div>
      </li>
    ));
  }

  render() {
    const {filter, filteredBindings } = this.props.store;
    const bindingLis = this.generateBindingsLis(filteredBindings);

    return (
    <div>
      <ul className="bindingsList">
        <li className="menu">
          <div className="inlineElements">
            <span className="click" onClick={this.createNew.bind(this)}>&#10133;</span>
            <span className="click btn" onClick={this.toogleExportMenu.bind(this)}>export</span>
            <span className="click btn" onClick={this.toogleImportMenu.bind(this)}>import</span>
            <span className="click btn" onClick={this.props.store.uniquify}>uniquify</span>
            <span className="click btn" onClick={this.clearAll.bind(this)}>clear</span>
            {/*<a target="_blank" href="https://gist.github.com/timadevelop/a908bc3b1ad294bea618e554b59aa074"
              className="click btn">help</a>
              */}
          </div>
          <div className="inlineElements">
            <input className="filter" value={filter} placeholder="filter bindings" onChange={this.filter.bind(this)} />
          </div>
        </li>
        {this.props.store.showExportMenu ? <ExportMenu data={this.props.store.filteredBindings}/> : null}
        {this.props.store.showImportMenu ? <ImportMenu /> : null}
        {bindingLis}
      </ul>
      <Footer />
     </div>
    )
  }
}
