<template>
  <div>
    <div class="header-tools">
      <router-link :to="{ name: 'TaskList'}" title="На главную">
        <span class="icon-home"></span>
      </router-link>
      <ul>
        <li><span class="icon-plus" v-on:click="createTodo" title="Создать карточку"></span></li>
      </ul>
    </div>
    <div class="card-wrapper">
      <article class="card" v-for="(todo, index) in todos"
               :key="todo.id">
        <header class="card__header">
          <span class="icon-cancel" title="Удалить карточку" @click="showModal(index)"></span>
          <h1 class="text-ellipsis">{{todo.title}}</h1>
        </header>
        <div class="card__content">
          <ul>
            <li v-for="task in todo.subtasks.slice(0, 3)"
             :key="task.id" class="text-ellipsis">
              <span class="icon-right-open"></span>
              {{task.title}}
            </li>
          </ul>
        </div>
        <footer class="card__footer">
          <router-link :to="{ name: 'EditTask', params: {taskId: todo.id}}" title="Редактировать">
            <div class="icon-pencil"></div>
          </router-link>
        </footer>
      </article>
      <modal
        v-show="isModalVisible"
        @close="closeModal"
        @confirm="deleteTodo"
      />
    </div>
  </div>
</template>

<script>
import TaskClass from '../classes/TaskClass'
import Modal from './Modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
      todos: [],
      selectedTodo: null,
      isModalVisible: false
    }
  },
  methods: {
    getTodos: function () {
      this.todos = JSON.parse(localStorage.getItem('todos'))
      this.todos = this.todos ? this.todos : []
    },
    createTodo: function () { // создание карточки и открытие её для редактирования
      // eslint-disable-next-line new-cap
      let newTodo = new TaskClass()
      this.todos.push(newTodo)
      let todosJson = JSON.stringify(this.todos) // сохранение данных в localStorage после создания карточки (Используется как заглушка при отсутствии сервера)
      localStorage.setItem('todos', todosJson)
      this.$router.push({name: 'EditTask', params: {taskId: newTodo.id}})
    },
    deleteTodo: function () { // удаление карточки
      this.todos.splice(this.selectedTodo, 1)
      let todosJson = JSON.stringify(this.todos) // пересохранение данных в localStorage после удаления карточки
      localStorage.setItem('todos', todosJson)
      this.closeModal()
    },
    showModal: function (index) {
      this.isModalVisible = true
      this.selectedTodo = index
    },
    closeModal: function () {
      this.isModalVisible = false
    }
  },
  mounted () {
    this.getTodos() // получение данных из localStorage при загрузке компонента
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import 'src/assets/style/global';

  .card-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;

    .card {
      @extend %box-shadow-2;
      position: relative;
      min-width: 150px;
      width: 30%;
      height: 180px;
      margin: 16px 16px 32px 16px;
      padding: 16px;
      background-color: #fff;
      border-radius: 8px;

      &:hover {
        @extend %box-shadow-1;
      }

      &__header {
        cursor: default;

        .icon-cancel {
          position: absolute;
          top: 8px;
          right: 8px;
        }
      }

      &__content {
        ul {
          list-style: none;
          margin: 18px 0 0 0;
          padding: 0;
          cursor: default;

          li {
            margin-bottom: 4px;
            font-size: .9rem;

            .icon-right-open {
              font-size: 12px;
              opacity: .8;
            }
          }
        }
      }

      &__footer {
        a {
          @extend %box-shadow-2;
          position: absolute;
          left: calc(50% - 28px);
          bottom: -28px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background-color: $secondColor;
          border-radius: 100%;

          &:hover {
            @extend %box-shadow-1;
            transition: all .3s;
            background-color: $secondColorHovered;
          }

          .icon-pencil {
            color: #fff;
            font-size: 20px;
          }
        }
      }
    }

    @include small-screen {
      .card {
        width: 45%;
        min-width: 200px;
      }
    }
    @include extra-small-screen {
      .card {
        width: 100%;
      }
    }
  }

</style>
