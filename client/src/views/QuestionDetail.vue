<template>
    <div class="container">
        <div v-if="loading">
            <img src="https://static.wubook.net/shstatic/imgs/cloading.gif" alt="">
        </div>
        <div v-else>
            <h2>{{ question.title }}</h2>
            <hr class="col-11">
            <div class="d-flex">
                <div class="col-1 my-2">
                    <h5>{{ question.upvotes.length }}</h5>
                    <img @click="vote('up')" class="pointtoit" src="https://img.icons8.com/ios/50/000000/sort-up.png" height="50px">
                    <!-- <h4>{{question.upvotes.length - question.downvotes.length}}</h4> -->
                    <img @click="vote('down')" class="pointtoit" src="https://img.icons8.com/ios/50/000000/sort-down.png" height="50px">
                    <h5>{{ question.downvotes.length }}</h5>                    
                    <div v-if="admin" class="mt-5">
                        <button class="btn btn-primary" @click="editQuestion">Edit</button>
                        <button class="btn btn-danger mt-3" @click="removeQuestion">Delete</button>
                    </div>
                </div>
                <div class="mx-2 col">
                    <div class="row-9">
                        <p v-html="question.description"></p>
                    </div>
                    <div class="mt-5" style="text-align: left;">
                        <p class="attributes">Asked <strong>{{ toDate(question.created_at) }}</strong></p>
                        <p class="attributes">Asked by <strong>{{ question.user.name }} </strong></p>
                        <p class="attributes">Viewed <strong>{{ question.views.length }} times </strong></p>
                        <div>
                            <span class="pointtoit mx-1" v-for="(tag, index) in question.tags" :key="index"><button class="btn btn-info btn-sm">{{ tag.name }}</button></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-form amber-textarea active-amber-textarea col-12 my-5">
                <h5>Your Answer:</h5>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Title" v-model="title">
                <i class="fas fa-pencil-alt prefix"></i>
                <textarea type="text" id="form22" class="md-textarea form-control" rows="3" placeholder="Write an answer here ..." v-model="answer"></textarea>
                <button class="btn btn-primary mt-2" @click="postAnswer">Submit Answer</button>
            </div>
            <h4 style="text-align: left;">{{ question.answers.length }} Answer(s)</h4>
            <div v-for="answer in question.answers" :key="answer.id">
                <Answer @get-question="getQuestion" :answer="answer" />
            </div>
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
import Answer from '@/components/Answer.vue'
// import { setTimeout } from 'timers'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

export default {
    name: 'question-detail',
    components: {
        Answer
    },
    created() {
        this.viewedByUser()
        this.getQuestion('created')
    },
    data() {
        return {
            question: {},
            title: '',
            answer: '',
            loading: false,
            admin: false
        }
    },
    methods: {
        loadingIt() {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, 1500)
        },
        getQuestion(origin) {
            if (origin === 'created') {
                this.loading = true
            }
            server({
                url: `/questions/${this.$route.params.id}`,
                method: 'get'
            })
            .then(({data}) => {
                if (data) {
                    this.loading = false
                }
                this.question = data
                this.checkAdmin()
            })
            .catch(err => {
                console.log(err)
            })
        },
        postAnswer() {
            server({
                url: `/answers`,
                method: 'post',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    title: this.title,
                    description: this.answer,
                    questionId: this.$route.params.id
                }
            })
            .then(({data}) => {
                this.title = ''
                this.answer = ''

                Toast.fire({
                    type: 'success',
                    title: `Answer has been submited`
                })
                this.getQuestion()
                this.$store.dispatch('getAllQuestions')
            })
            .catch(err => {
                console.log(err)
            })
        },
        viewedByUser() {
            if (localStorage.getItem('token')) {
                server({
                    url: `/questions/user-view-question/${this.$route.params.id}`,
                    method: 'put',
                    headers: {
                        access_token: localStorage.getItem('token')
                    }
                })
                .then(({data}) => {
                    this.getQuestion()
                    this.$store.dispatch('getAllQuestions')
                    // return
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        vote(command) {
            if (!localStorage.getItem('token')) {
                Swal.fire('Error', 'You have to login first', 'error')
            } else {
                server({
                    url: `/questions/vote/${this.$route.params.id}`,
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
        toDate(date) {
            return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
        },
        checkAdmin() {
            if (localStorage.getItem('id') == this.question.user._id) {
                this.admin = true
            } else {
                this.admin = false
            }
        },
        editQuestion() {
            this.$router.push({
                path: '/ask',
                query: {
                    id: this.$route.params.id
                }
            })
        },
        removeQuestion() {
            Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                if (result.value) {
                    server({
                        url: `/questions/${this.$route.params.id}`,
                        method: 'delete',
                        headers: {
                            access_token: localStorage.getItem('token')
                        }
                    })
                    .then(({data}) => {
                        this.$store.dispatch('getAllQuestions')
                        this.$router.replace('/')

                        Swal.fire(
                            'Deleted!',
                            `${data.msg}`,
                            'success'
                        )
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
        }
    }
}
</script>

<style>
.attributes {
    font-size: 0.7em;
}
</style>
