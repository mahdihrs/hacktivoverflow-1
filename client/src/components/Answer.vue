<template>
    <div>
        <div v-if="answer.length === 0">
            <h6>This question has no answers yet.</h6>
        </div>
        <div v-else>
            <div>
                <div class="card my-1">
                    <div class="card-body d-flex">
                        <div>
                            <h5>{{ answer.upvotes.length }}</h5>
                            <img class="pointtoit"  @click.prevent="vote('up', answer._id)" src="https://img.icons8.com/ios/50/000000/sort-up.png" height="40px"> <br>
                            <!-- <h5>{{answer.upvotes.length - answer.downvotes.length}}</h5> -->
                            <img class="pointtoit"  @click.prevent="vote('down', answer._id)" src="https://img.icons8.com/ios/50/000000/sort-down.png" height="40px">
                            <h5>{{ answer.downvotes.length }}</h5>
                        </div>
                        <div class="col-9">
                            <div class="card-title-answer">
                                <h5>-- {{ answer.title }} --</h5>
                            </div>
                            <hr>
                            <div class="card-body-answer">
                                {{ answer.description }}
                            </div>
                        </div>
                        <div>
                            <p class="card2answer">Answered by: {{ answer.user.name}}</p>
                            <p class="card2answer">{{ toDate(answer.user.created_at)}}</p>
                            <div class="mt-2">
                                <button class="btn btn-success" v-if="admin" @click="editAnswer(answer._id)">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import server from '@/api/server.js'
import Swal from 'sweetalert2'

export default {
    name: 'answer',
    props: ['answer'],
    created() {
        this.checkAdmin()
    },
    data() {
        return {
            admin: true,
            editIt: true,
            description: this.answer.description
        }
    },
    computed: {},
    methods: {
        editAnswer(id) {
            // console.log(this.$route)
            this.$router.push({
                path: `/answers/edit/${id}`,
                query: {
                    qId: this.$route.params.id
                }
            })
        },
        toDate(date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        },
        vote(command, id) {
            if (!localStorage.getItem('token')) {
                Swal.fire('Error', 'You have to login first', 'error')
            } else {
                server({
                    url: `/answers/vote/${id}`,
                    method: 'put',
                    headers: {
                        access_token: localStorage.getItem('token')
                    },
                    data: {
                        direction: command
                    }
                })
                .then(({data}) => {
                    this.getQuestion()
                    this.$store.dispatch('getAllQuestions')
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        getQuestion() {
            this.$emit('get-question')
        },
        checkAdmin() {
            if (localStorage.getItem('id') == this.answer.user._id) {
                this.admin = true
            } else {
                this.admin = false
            }
        }
    }
}
</script>

<style>
    .card2answer {
        font-size: 0.7em;
    }
</style>
