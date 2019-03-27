<template>
    <div>
        <div class="row">
            <div class="col-9">
                <h3 class="mb-0" style="text-align: left;">Top Questions</h3>
            </div>
            <div class="col-2">
                <button class="btn btn-primary" @click="$router.push('/ask')">Ask Question</button>
            </div>
        </div>
        <div class="mt-3" v-for="q in allQuestions" :key="q.id">
            <QuestionList :q="q"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import QuestionList from '@/components/QuestionList.vue'

export default {
    name: 'homepage',
    components: {
        QuestionList
    },
    computed: {
        ...mapState([
            'allQuestions'
        ])
    },
    methods: {

    }
}
</script>

<style>

</style>
