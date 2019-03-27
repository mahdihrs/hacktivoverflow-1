<template>
    <div>
        <div>
            <Navbar />
        </div>
        <div>
            <div class="my-5 container col-7">
                <form @submit.prevent="register">
                    <fieldset>
                        <legend>Register Form</legend>
                        <div class="form-group my-4">
                            <label>Full Name</label>
                            <input type="text" class="form-control" placeholder="Enter Full Name" v-model="name">
                            <p style="color: red; font-size: 1em;"><strong>{{nameError}}</strong></p>
                        </div>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="text" class="form-control" placeholder="Enter email" v-model="email">
                            <p style="color: red; font-size: 1em;"><strong>{{emailError}}</strong></p>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" placeholder="Enter password" v-model="password">
                            <p style="color: red; font-size: 1em;"><strong>{{passwordError}}</strong></p>
                        </div>                
                        <div class="form-group">
                            <label>Birthday</label>
                            <input type="date" class="form-control" placeholder="Birthday" v-model="birthday">
                            <p style="color: red; font-size: 1em;"><strong>{{birthdayError}}</strong></p>
                        </div>        
                        <div class="form-group">
                            <label>Watched Tags</label>
                            <vue-tags-input
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                            />
                        </div>        
                    </fieldset>
                    <button type="submit" class="btn btn-primary">Register</button>
                </form>
                <p class="my-4">Already have an account? <router-link class="my-5" to="/login"><u>Login</u></router-link></p>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
import Swal from 'sweetalert2'
import VueTagsInput from '@johmun/vue-tags-input';
import Navbar from '@/components/Navbar.vue'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000
});

export default {
    name: 'register',
    components: {
        VueTagsInput,
        Navbar,
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            birthday: '',
            tag: '',
            tags: [],
            //errors
            nameError: '',
            emailError: '',
            passwordError: '',
            birthdayError: ''
        }
    },
    methods: {
        register() {
            this.nameError = ''
            this.emailError = ''
            this.passwordError = ''
            this.birthdayError = ''

            server({
                url: `/users`,
                method: 'post',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    birthday: this.birthday,
                    watchedTags: this.tags
                }
            })
            .then(({data}) => {
                Toast.fire({
                    type: 'success',
                    title: `${data.msg}`
                })
                this.$router.replace('/login')
            })
            .catch(err => {
                let res = err.response.data
                if (res.name) this.nameError = res.name
                if (res.email) this.emailError = res.email
                if (res.password) this.passwordError = res.password
                if (res.birthday) this.birthdayError = res.birthday
            })
        }
    }
}
</script>

<style>

</style>
