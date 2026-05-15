
// EventEmitter(EventDispatcher) class
// by http://www.datchley.name/es6-eventemitter/
//
/*
// *** for use *** //
  let evt = new EventEmitter()
  evt.addListener("TEST",function(){
    console.log("UUUU")
  })
  evt.addListener("TEST2",function(e){
    console.log("CCC",e.type)
  })
  evt.emit("TEST")
  evt.emit("TEST2",{type:"1"})
 */

export default class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  addListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }
  removeListener(label, callback) {
      let listeners = this.listeners.get(label),
          index;

      if (listeners && listeners.length) {
          index = listeners.reduce((i, listener, index) => {
              return ((typeof listener == 'function' || false) && listener === callback) ?
                  i = index :
                  i;
          }, -1);

          if (index > -1) {
              listeners.splice(index, 1);
              this.listeners.set(label, listeners);
              return true;
          }
      }
      return false;
  }

  emit(label, ...args) {
    let listeners = this.listeners.get(label);

    if (listeners && listeners.length) {
        listeners.forEach((listener) => {
            listener(...args);
        });
        return true;
    }
    return false;
  }

}
