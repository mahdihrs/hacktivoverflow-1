<template>
    <div class="vh-90" style="overflow-y: scroll;">
        <h3>Questions for you.</h3>
        <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            class="form-group vw-100"
        />
        <button @click="editTags" style="text-align: left;" class="btn btn-success">Edit Tags</button>
        <div v-if="loading">
            <hr>
            <img src="https://static.wubook.net/shstatic/imgs/cloading.gif" alt="">
        </div>
        <div v-else class="mt-3" v-for="q in questionByMyWatchedTags" :key="q.id">
            <QuestionList :q="q"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionList from '@/components/QuestionList.vue'
import VueTagsInput from '@johmun/vue-tags-input'
import server from '@/api/server.js'

export default {
    name: 'watched-tags',
    components: {
        QuestionList,
        VueTagsInput
    },
    created() {
        this.$store.dispatch('getProfileInfo')
        this.$store.dispatch('getQuestionsByWatchedTags')
        this.populateTags()
    },
    data() {
        return {
            tag: '',
            tags: [],
            loading: false,
            add: [],
            reduce: []
        }
    },
    computed: mapState([
        'questionByMyWatchedTags'
    ]),
    watch: {
    },
    methods: {
        populateTags() {
            // if (this.$store.state.userLogin.watchedTags.length > 0) {
                this.tags = []
                this.loading = true
                let meTags = this.$store.state.userLogin.watchedTags
                meTags.forEach(tag => {
                    this.tag = tag
                    this.tags.push({
                        text: this.tag,
                        tiClasses: ['ti-valid']
                    })
                    this.tag = ''
                })
                this.loading = false
            // }
        },
        editTags() {
            server({
                url: `/users/edit-my-watched-tags`,
                method: 'patch',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    tags: this.tags
                }
            })
            .then(({data}) => {
                this.$store.dispatch('getProfileInfo')
                this.$store.dispatch('getQuestionsByWatchedTags')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
