<template>
  <div class="home">
      <Navbar />
    <div class="d-flex">
      <div
          class="col-2 vh-100" 
          style="border-right: 1px solid rgb(229, 229, 229);"
          >
        <Sidebar />
      </div>
      <div class="container my-3 vh-100" style="overflow-y: scroll;">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  created() {
    this.$store.dispatch('getAllQuestions')
    this.setLogin()
    this.$store.dispatch('getQuestionsByWatchedTags')
    this.$store.dispatch('getProfileInfo')
    this.$store.dispatch('getAllTags')
  },
  components: {
    Navbar,
    Sidebar
  },
  computed: mapState([
    'isLogin'
  ]),
  methods: {
    setLogin() {
      if (localStorage.getItem('token')) {
        this.$store.commit('SetIsLogin', true)
        this.$store.commit('SetUserLogin', {
          id: localStorage.getItem('id'),
          watchedTags: localStorage.getItem('watchedTags').split(' ')
        })
      } else {
        this.$store.commit('SetIsLogin', false)
      }
    }
  }
}
</script>
