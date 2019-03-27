<template>
    <div>
        <div>
            <Navbar />
        </div>
        <div class="my-5 container col-5">
            <form @submit.prevent="userLogin">
                <fieldset>
                    <legend>Login Form</legend>
                    <p style="color: red; font-size: 1.3em;"><strong>{{error}}</strong></p>
                    <div class="form-group my-4">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password" v-model="password">
                    </div>
                </fieldset>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <p class="my-4">Do not have an account? Please <router-link class="my-5" to="/register"><u>Register</u></router-link></p>
            <hr>
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
import Swal from 'sweetalert2'
import Navbar from '@/components/Navbar.vue'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    components: {
        Navbar,
    },
    methods: {
        userLogin() {
            server({
                url: `/users/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('id', data.user._id)
                localStorage.setItem('watchedTags', data.user.watchedTags.join(' '))
                this.$store.commit("SetIsLogin", true)
                this.$store.dispatch('getAllTags')
                this.$store.commit("SetUserLogin", {
                    id: data.user._id,
                    watchedTags: data.user.watchedTags,
                    name: data.user.name
                })
                this.$store.dispatch('getQuestionsByWatchedTags')
                Toast.fire({
                    type: 'success',
                    title: `${data.msg}`
                })
                this.$router.replace('/')
            })
            .catch(err => {
                if (err.response.data.msg) {
                    Toast.fire({
                        type: 'error',
                        title: `${err.response.data.msg}`
                    })
                } else {
                    Swal.fire(`Internal Server Error`, "", "error")
                }
            })
        }
    }
}
</script>

<style>

</style>
