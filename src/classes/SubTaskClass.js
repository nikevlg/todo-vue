export default class SubTaskClass {
  constructor (name) {
    this.id = this.generateId()
    this.title = name || 'Новая подзадача'
    this.complete = false
  }
  generateId () {
    return 'id_' + Math.random().toString(36).substr(2, 9)
  }
}
