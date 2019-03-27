import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import router from './router'
import store from './store'
import server from './api/server';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userLogin: {},
    // questions
    allQuestions: [],
    questionsByTag: [],
    questionByMyWatchedTags: [],
    //tags
    allTags: []
  },
  mutations: {
    SetIsLogin(state, payload) {
      state.isLogin = payload
    },
    SetUserLogin(state, payload) {
      state.userLogin = payload
    },
    SetAllQs(state, payload) {
      state.allQuestions = payload
    },
    SetQuestionsByTag(state, payload) {
      state.questionsByTag = payload
    },
    SetWatchedTagsRecommendations(state, payload) {
      state.questionByMyWatchedTags = payload
    },
    SetTags(state, payload) {
      state.allTags = payload
    }
  },
  actions: {
    logout({commit}) {
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      localStorage.removeItem('watchedTags')
      commit('SetIsLogin', false)
      router.replace('/')
    },
    getAllQuestions({commit}) {
      server({
        url: `/questions`,
        method: 'get',
      })
      .then(({data}) => {
        // console.log(data)
        commit('SetAllQs', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    searchQuestionsByTag({commit}, id) {
      server({
        url: `/questions/search-tag/${id}`,
        method: 'get',
      })
      .then(({data}) => {
        commit('SetQuestionsByTag', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getQuestionsByWatchedTags({commit}) {
      server({
        url: `/users/my-articles-based-on-watched-tags`,
        method: 'get',
        headers: {
          access_token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        commit('SetWatchedTagsRecommendations', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getProfileInfo({commit}) {
      server({
        url: `/users/${localStorage.getItem('id')}`,
        method: 'get'
      })
      .then(({data}) => {
        commit('SetUserLogin', {
          id: data._id,
          name: data.name,
          watchedTags: data.watchedTags
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllTags({commit}) {
      server({
        url:`/tags`,
        method: 'get'
      })
      .then(({data}) => {
        commit('SetTags', data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
})
