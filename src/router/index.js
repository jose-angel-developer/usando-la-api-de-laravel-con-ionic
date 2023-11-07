import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

import AddStudent from '../views/AddStudent.vue'
import Student from '../views/Student.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/addStudent'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/addStudent'
      },
      {
        path: 'addStudent',
        component: AddStudent
      },
      {
        path: 'Student',
        component: Student
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
