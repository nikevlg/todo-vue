import Vue from 'vue'
import Router from 'vue-router'
import TaskList from '@/components/TaskList'
import EditTask from '@/components/EditTask'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

function dynamicTaskId (route) {
  return {
    currentTaskId: route.params.taskId
  }
}

export default new Router({
  hashbang: false,
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/edit/*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/edit/:taskId',
      name: 'EditTask',
      component: EditTask,
      props: dynamicTaskId
    }
  ]
})
