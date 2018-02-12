import { computed, observable } from "mobx"

class KeyBinding {
  @observable key
  @observable value
  @observable id
  @observable complete

  constructor(key, value) {
    this.key = key
    this.value = value
    this.id = Date.now()
    this.complete = false
  }
}


function format(s) {
  return s.replace(/\n/g, '')
}

export class KeyBindingsStore {
  constructor(){
    this.bindings.push(new KeyBinding("Ctrl+V", "paste"))
  }
  @observable bindings = []
  @observable filter = ""
  @observable showExportMenu = false;
  @observable showImportMenu = false;

  @computed get filteredBindings() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.bindings.filter(binding => !this.filter || matchesFilter.test(binding.value) || matchesFilter.test(binding.key))
  }

  clear() {
    this.bindings.replace([]);
    this.filter.replace("");
  }

  createBinding(key, value) {
    this.bindings.unshift(new KeyBinding(key, value))
  }
  pushNew(key, value) {
    this.bindings.push(new KeyBinding(format(key), format(value)))
  }


  uniquify = () => {
    const filtered = this.bindings.filter((thing, index, self) =>
      index === self.findIndex((t) =>
        (t.place === thing.place && t.key === thing.key && t.value === thing.value)) // as feature?
    );
    this.bindings.replace(filtered);
  }

  clearComplete = () => {
    const incompleteBinds = this.bindings.filter(binding => !binding.complete)
    this.bindings.replace(incompleteBinds)
  }

  clearById = (id) => {
    const result = this.bindings.filter(binding => binding.id !== id)
    this.bindings.replace(result)
  }
}

export default new KeyBindingsStore
