<template>
    <div>
        <h4 style="text-align: center;">Tags</h4>
        <hr>
        <div class="container d-flex flex-wrap">
            <!-- {{tag}} -->
            <div class="list-group col col-4" v-for="tag in allTags" :key="tag.id">
                <a href="" class="list-group-item list-group-item-action flex-column align-items-start" @click.prevent="getQuestions(tag._id)">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{ tag.name }}</h5>
                    </div>
                    <!-- <p class="mb-1">Asked {{ tag.questions.length }} times</p>
                    <small class="text-muted">Donec id elit non mi porta.</small> -->
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'tags',
    computed: mapState([
        'allTags'
    ]),
    methods: {
        getQuestions(id) {
            this.$router.push(`/tags/${id}`)
        }
    }
}
</script>

<style>

</style>
