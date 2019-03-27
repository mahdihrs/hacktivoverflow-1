<template>
    <div class="container justify-content-center">
        <!-- <form @submit.prevent="editAnswer" class="col-5">
            <fieldset>
                <legend>Edit Answer</legend>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Answer</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="answer">
                    </div>
                    <button class="btn btn-primary" type="submit">Edit</button>
            </fieldset>
        </form> -->
        <div class="md-form amber-textarea active-amber-textarea col-12 my-5">
            <h5>Your Answer:</h5>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Title" v-model="title">
            <i class="fas fa-pencil-alt prefix"></i>
            <textarea type="text" id="form22" class="md-textarea form-control" rows="3" placeholder="Write an answer here ..." v-model="answer"></textarea>
            <button class="btn btn-primary mt-2" @click="editAnswer">Edit Answer</button>
        </div>
    </div>
</template>

<script>
import server from '@/api/server.js'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

export default {
    created() {
        this.populateAnswer()
    },
    data() {
        return {
            title: '',
            answer: '',
            theAnswer: {}
        }
    },
    methods: {
        populateAnswer() {
            server({
                url: `/answers/${this.$route.params.id}`,
                method: 'get',
                headers: {
                    access_token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.theAnswer = data
                this.title = data.title
                this.answer = data.description
            })
            .catch(err => {
                console.log(err)
            })
        },
        editAnswer() {
            server({
                url: `/answers/${this.$route.params.id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    title: this.title,
                    description: this.answer
                }
            })
            .then(({data}) => {
                this.$store.dispatch('getAllQuestions')
                this.$router.replace(`/q/detail/${this.$route.query.qId}`)
                Toast.fire({
                    type: 'success',
                    title: `${data.msg}`
                })
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
