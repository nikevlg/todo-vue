export default class TaskClass {
  constructor (name) {
    this.id = this.generateId()
    this.title = name || 'Новый список задач'
    this.subtasks = []
  }
  generateId () {
    return 'id_' + Math.random().toString(36).substr(2, 9)
  }
}
