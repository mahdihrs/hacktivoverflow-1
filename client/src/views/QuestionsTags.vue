<template>
    <div>
        <h4 style="text-align: center;">Questions List with Tag "{{ tag.name }}"</h4>
        <div v-for="q in questions" :key="q._id">
            <QuestionList :q="q" />
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
import QuestionList from '@/components/QuestionList.vue'

export default {
    name: 'question-tags',
    components: {
        QuestionList
    },
    created() {
        this.questionsByTag()
    },
    data() {
        return {
            questions: [],
            tag: '',
            loading: false
        }
    },
    methods: {
        questionsByTag() {
            server({
                url: `/questions/search-tag/${this.$route.params.id}`,
                method: 'get'
            })
            .then(({data}) => {
                this.questions = data.Qs
                this.tag = data.tag
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
