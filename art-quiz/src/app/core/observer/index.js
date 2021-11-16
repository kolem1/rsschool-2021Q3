export default class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(func) {
    this.subscribers.push(func)
  }

  unsubscribe (func) {
    this.subscribers = this.subscribers.filter(subscriber => subscriber !== func)
  }

  dispatch(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}