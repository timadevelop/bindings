import { toJS, computed, observable } from "mobx"

const storageName = 'bindings-list'

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

// save bindings list to localStorage
function storeLocal(obj)
{
  localStorage.setItem(storageName, JSON.stringify(toJS(obj)));
}

// load bindings list
function load()
{
  // console.log(typeof localStorage.getItem(storageName));
  return JSON.parse(localStorage.getItem(storageName));
}

export class KeyBindingsStore {
  constructor(){
    const loadedBindings = load();
    if (loadedBindings !== null)
    {
      this.bindings = loadedBindings;
    }
    else
    {
      storeLocal([]);
      this.bindings = [];
    }
  }
  @observable bindings = []
  @observable filter = ""
  @observable showExportMenu = false;
  @observable showImportMenu = false;

  @computed get filteredBindings() {
    var matchesFilter = new RegExp(this.filter, "i")
    return this.bindings.filter(binding => !this.filter || matchesFilter.test(binding.value) || matchesFilter.test(binding.key))
  }
  
  // remove all binds
  clear() {
    this.bindings.replace([]);
    this.filter.replace("");
    storeLocal(this.bindings);
  }

  // add new
  createBinding(key, value) {
    this.bindings.unshift(new KeyBinding(key, value))
    storeLocal(this.bindings);
  }
  pushNew(key, value) {
    this.bindings.push(new KeyBinding(format(key), format(value)))
    storeLocal(this.bindings);
  }

  // 
  uniquify = () => {
    const filtered = this.bindings.filter((thing, index, self) =>
      index === self.findIndex((t) =>
        (t.place === thing.place && t.key === thing.key && t.value === thing.value)) // as feature?
    );
    this.bindings.replace(filtered);
    storeLocal(this.bindings);
  }

  // depr
  clearComplete = () => {
    const incompleteBinds = this.bindings.filter(binding => !binding.complete)
    this.bindings.replace(incompleteBinds)
    storeLocal(this.bindings);
  }

  clearById = (id) => {
    const result = this.bindings.filter(binding => binding.id !== id)
    this.bindings.replace(result)
    storeLocal(this.bindings);
  }
}

export default new KeyBindingsStore
