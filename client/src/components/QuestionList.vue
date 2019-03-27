<template>
    <div>
        <hr>
        <div class="mx-4">
            <div class="d-flex">
                <div>
                    <div class="row ml-3">
                        <div class="mx-2">
                            <p class="font-amount">{{ q.upvotes.length }}</p>
                            <p class="font-qcard">upvotes</p>
                        </div>
                        <div class="mx-2">
                            <!-- <p class="font-amount">{{ votesCounter(q.upvotes, q.downvotes) }}</p> -->
                            <p class="font-amount">{{ q.downvotes.length }}</p>
                            <p class="font-qcard">downvotes</p>
                        </div>
                        <div class="mx-2">
                            <p class="font-amount">{{ q.answers.length }}</p>
                            <p class="font-qcard">answers</p>
                        </div>
                        <div class="mx-2">
                            <p class="font-amount"> {{ q.views.length }}</p>
                            <p class="font-qcard">views</p>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="mb-4 pointtoit ml-4 title" style="text-align: left;" @click="getQuestion">
                        {{ q.title}}
                    </div>
                    <div class="ml-4">
                        <span class="mx-3" v-for="tag in q.tags" :key="tag._id"><button class="btn btn-info btn-sm" @click="getQuestionsByTag(tag._id)">{{ tag.name }}</button></span>
                    </div>
                </div>
                <div class="col-3 font-qcard">
                    <p>asked by: {{ q.user.name}}</p>
                    <p>{{ toDate(q.created_at) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'question-list',
    props: ['q'],
    computed: {
        tags() {
            return this.q.tags.map(e => e.name)
        }
    },
    methods: {
        toDate(date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        },
        getQuestion() {
            this.$router.push(`/q/detail/${this.q._id}`)
        },
        votesCounter(up, down) {
            return up.length - down.length
        },
        getQuestionsByTag(id) {
            this.$router.push(`/tags/${id}`)
        }
    }
}
</script>

<style scoped>
    .title:hover {
        color: #000;
    }
    .font-amount {
        font-size: 1.2em;
    }
    .font-qcard {
        font-size: 0.7em;
    }
</style>
