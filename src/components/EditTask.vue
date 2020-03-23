<template>
  <div>
    <div class="header-tools">
      <router-link :to="{ name: 'TaskList'}" title="На главную">
        <span class="icon-home"></span>
      </router-link>
      <ul>
        <li><span class="icon-floppy" v-on:click="saveTask" title="Сохранить карточку"></span></li>
        <li><span class="icon-cancel" v-on:click="cancelChange" title="Отменить все изменения"></span></li>
        <li>&nbsp;</li>
        <li><span class="icon-reply" v-on:click="backHistory" title="Назад"></span></li>
        <li><span class="icon-forward" v-on:click="forwardHistory" title="Вперед"></span></li>
        <li>&nbsp;</li>
        <li><span class="icon-trash" title="Удалить карточку" @click="showModal"></span></li>
      </ul>
    </div>
    <div class="edit-card-wrapper">
      <div class="edit-card">
        <div class="edit-card__title"><input type="text" v-model="task.title" @blur="saveHistory" placeholder="Введите имя карточки">
          <span class="icon-plus" v-on:click="addSubtask" title="Добавить подзадачу"></span></div>
        <ul>
          <li v-for="(subtask, index) in task.subtasks"
              :key="subtask.id" v-bind:class="{ cross: subtask.complete }">
            <input type="text" v-model="subtask.title" :disabled="subtask.complete" @blur="saveHistory" placeholder="Введите подзадачу">
            <input type="checkbox" v-model=subtask.complete @change="saveHistory">
            <span class="icon-cancel" v-on:click="deleteSubtask(index)"></span>
          </li>
        </ul>
      </div>
      <modal
        v-show="isModalVisible"
        @close="closeModal"
        @confirm="deleteTodo(index)"
      />
    </div>
  </div>
</template>

<script>
import SubTaskClass from '../classes/SubTaskClass'
import Modal from './Modal'

export default {
  props: {
    currentTaskId: { // получаем id карточки из роутинга
      type: String,
      default: ''
    }
  },
  components: {
    Modal
  },
  data () {
    return {
      task: {},
      isModalVisible: false,
      originalTask: {},
      lastRolledTask: null,
      historyTask: []
    }
  },
  methods: {
    getTask: function () { // сравниваем id карточки с наличием такого же в базе
      let todos = JSON.parse(localStorage.getItem('todos'))
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === this.currentTaskId) {
          this.task = todos[i]
          break
        } else if (i === todos.length - 1) {
          this.$router.push({name: 'PageNotFound'})
        }
      }
      this.originalTask = JSON.stringify(this.task)
      this.historyTask.push(this.originalTask)
    },

    addSubtask: function () {
      this.task.subtasks.push(new SubTaskClass())
      this.saveHistory()
    },

    deleteSubtask: function (index) {
      this.task.subtasks.splice(index, 1)// удаление  подзадачи
      this.saveHistory()
    },

    saveHistory: function () {
      this.historyTask.push(JSON.stringify(this.task)) // сохранение истории
    },

    backHistory: function () {
      if (this.historyTask.length > 1) {
        this.lastRolledTask = this.historyTask.pop()
        this.task = JSON.parse(this.historyTask[this.historyTask.length - 1])
      }
    },

    forwardHistory: function () {
      if (this.lastRolledTask) {
        this.task = JSON.parse(this.lastRolledTask)
        this.historyTask.push(this.lastRolledTask)
        this.lastRolledTask = null
      }
    },

    cancelChange: function () {
      this.task = JSON.parse(this.originalTask)
      this.historyTask = []
      this.historyTask.push(this.originalTask)
    },

    saveTask: function () {
      this.todos = JSON.parse(localStorage.getItem('todos'))
      let index = this.todos.findIndex(x => x.id === this.currentTaskId)
      this.todos[index] = this.task
      let todosJson = JSON.stringify(this.todos) // сохранение данных в localStorage
      localStorage.setItem('todos', todosJson)
      this.historyTask = []
      this.historyTask.push(this.originalTask)
    },
    showModal: function () {
      this.isModalVisible = true
    },
    closeModal: function () {
      this.isModalVisible = false
    },
    deleteTodo: function () {
      this.todos = JSON.parse(localStorage.getItem('todos'))
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].id === this.currentTaskId) {
          this.todos.splice(this.todos.indexOf(this.todos[i]), 1)
          let todosJson = JSON.stringify(this.todos)
          localStorage.setItem('todos', todosJson)
        }
      }
      this.closeModal()
      this.$router.push({name: 'TaskList'})
    }
  },
  mounted () {
    this.getTask() // получение данных из localStorage при загрузке компонента
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import 'src/assets/style/global';

  .edit-card-wrapper {
    @extend %box-shadow-2;
    margin: 16px;
    background-color: #fff;
    padding: 32px 16px;
    border-radius: 8px;

    .edit-card {
      max-width: 600px;
      margin: auto;

      &__title {
        user-select: none;
        input {
          @include placeholder($lightText, 16px, left);
          width: 100%;
          padding: 12px !important;
          font-weight: bold;
          color: $firstText;
        }
      }

      input {
        border: 0;
        padding: 6px;
        margin-bottom: 12px;
        border-radius: 8px;
        color: $firstText;

        &[type="text"] {
          @extend %box-shadow-2;
          width: calc(100% - 64px);
          margin-right: 12px;
        }

        &[type="checkbox"] {
          margin-right: 4px;
          cursor: pointer;
        }
      }

      ul {
        list-style: none;
        margin: 16px 0 0 0;
        padding: 0;

        li {
          user-select: none;
          input{
            @include placeholder($lightText, 14px, left);
          }
          &.cross {
            input {
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
</style>
