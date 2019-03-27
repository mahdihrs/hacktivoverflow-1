<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#" @click="toHome"><span class="logo1">hacktiv</span><span class="logo2">overflow</span></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarColor03">
                <ul class="navbar-nav mr-auto">
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search">
                    <!-- <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button> -->
                </form>
                <div v-if="!isLogin">
                    <button class="btn navbar-button" @click="toLogin">Login</button>
                </div>
                <div v-else>
                    <button class="btn navbar-button" @click="logout">Logout</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState([
        'isLogin'
    ]),
    methods: {
        toHome() {
            this.$router.push('/')
        },
        toLogin() {
            this.$router.push('/login')
        },
        logout() {
            this.$store.dispatch('logout')
        }
    },
}
</script>

<style>
.logo2 {
    font-family: 'Germania One', cursive;
    font-size: 1.3em;
}
.logo1 {
    font-family: 'Arvo', serif;
}
.navbar-button {
    font-size: 1.3em;
}
</style>
