import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      children: [{
        path: '/',
        name: 'homepage',
        component: () => import(/* webpackChunkName: "navbar" */ '@/views/Homepage.vue')
      }, {
        path: 'ask',
        name: 'ask-question',
        component: () => import(/* webpackChunkName: "ask-question" */ '@/views/QuestionForm.vue')
      }, {
        path: 'q/detail/:id',
        name: 'question-detail',
        component: () => import(/* webpackChunkName: "question-detail" */ '@/views/QuestionDetail.vue')
      }, {
        path: 'watched-tags',
        name: 'watched-tags',
        component: () => import(/* webpackChunkName: "watched-tags" */ '@/views/WatchedTags.vue')
      }, {
        path: 'tags',
        name: 'tags',
        component: () => import(/* webpackChunkName: "tags" */ '@/views/Tags.vue')
      }, {
        path: 'tags/:id',
        name: 'questions-by-tag',
        component: () => import(/* webpackChunkName: "tags-questions" */ '@/views/QuestionsTags.vue') 
      }, {
        path: 'answers/edit/:id',
        name: 'answers-edit',
        component: () => import(/* webpackChunkName: "answer-edit" */ '@/views/EditAnswer.vue')
      }]
    }, {
      path: '/login',
      name: 'login-page',
      component: () => import(/* webpackChunkName: "login-page" */ '@/views/Login.vue')
    }, {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register-page" */ '@/views/Register.vue')
    }
  ]
})
