<template>
    <div class="my-6">
        <h1 v-if="toEdit">Edit Question</h1>
        <h1 v-else class="my-4">Create Question</h1>
        <!-- <form class="container" @submit.prevent="createQuestion"> -->
            <p style="color: red;">{{ titleError }}</p>
            <div class="form-group">
                <input id="title-input" type="text" class="form-control" placeholder="Title" v-model="title">
            </div>
            <vue-tags-input
                v-model="tag"
                :tags="tags"
                @tags-changed="newTags => tags = newTags"
                class="form-group vw-100"
            />
            <div>
                <p style="color: red;">{{ descriptionError }}</p>
                <wysiwyg v-model="myHTML" />
            </div>
            <div v-if="toEdit" class="mt-2">
                <button class="btn btn-success btn-md" @click="editQuestion">Edit</button>
            </div>
            <div v-else class="mt-2">
                <button class="btn btn-success btn-md" @click="createQuestion">Submit</button>
            </div>
        <!-- </form> -->
    </div>
</template>

<script>
import server from '@/api/server.js'
import VueTagsInput from '@johmun/vue-tags-input'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000
});

export default {
    name: 'add-question',
    created() {
        if(this.$route.query.hasOwnProperty('id')) {
            this.checkOrigin()
            this.toEdit = true
        }
    },
    data() {
        return {
            title: '',
            tag: '',
            tags: [],
            myHTML: '',
            //error message
            titleError: '',
            descriptionError: '',
            //condition add and edit form
            toEdit: false
        }
    },
    components: {
        VueTagsInput
    },
    methods: {
        checkOrigin() {
            server({
                url: `/questions/${this.$route.query.id}`,
                method: 'get'
            })
            .then(({data}) => {
                this.title = data.title
                this.myHTML = data.description

                data.tags.forEach(tag => {
                    this.tag = tag.name
                    this.tags.push({
                        text: this.tag,
                        tiClasses: ['ti-valid']                        
                    })
                    this.tag = ''
                });
            })
            .catch(err => {
                console.log(err)
            })
        },
        editQuestion() {
            this.titleError = ''
            this.descriptionError = ''
            server({
                url: `/questions/${this.$route.query.id}`,
                method: 'put',
                headers: {
                    access_token: localStorage.getItem('token')
                },
                data: {
                    title: this.title,
                    description: this.myHTML,
                    tags: this.tags
                }
            })
            .then(({data}) => {
                this.$store.dispatch('getAllQuestions')
                this.$router.replace('/')
                Toast.fire({
                    type: 'success',
                    title: `${data.msg}`
                })
                this.title = ''
                this.tag = ''
                this.tags = []
                this.myHTML = ''
            })
            .catch(err => {
                if (err) {
                    console.log(JSON.stringify(err.response), '====')
                    let res = err.response.data
                    if (res.title) this.titleError = res.title
                    if (res.description) this.descriptionError = res.description
                }
            })
        },
        createQuestion() {
            if (!localStorage.getItem('token')) {
                Swal.fire("Access Denied!", "You have to login first to create question!", "error");
            } else {
                this.titleError = ''
                this.descriptionError = ''

                server({
                    url:'/questions',
                    method:'post',
                    headers: {
                        access_token: localStorage.getItem('token')
                    },
                    data: {
                        title: this.title,
                        description: this.myHTML,
                        tags: this.tags
                    }
                })
                .then(({data}) => {
                    this.$store.dispatch('getAllQuestions')
                    this.$router.replace('/')
                    Toast.fire({
                        type: 'success',
                        title: `${data.msg}`
                    })
                    this.title = ''
                    this.tag = ''
                    this.tags = []
                    this.myHTML = ''
                })
                .catch(err => {
                    if (err) {
                        console.log(JSON.stringify(err.response), '====')
                        let res = err.response.data
                        if (res.title) this.titleError = res.title
                        if (res.description) this.descriptionError = res.description
                    }
                })
            }
        }
    }    
}
</script>

<style>
    #title-input {
        font-size: 1em;
    }
    .active-pink-textarea.md-form label.active {
    color: #f48fb1;
    }
    .pink-textarea textarea.md-textarea:focus:not([readonly]) {
        border-bottom: 1px solid #f48fb1;
        box-shadow: 0 1px 0 0 #f48fb1;
    }
    .pink-textarea.md-form .prefix.active {
        color: #f48fb1;
    }

    .active-amber-textarea.md-form label.active {
        color: #ffa000;
    }
    .amber-textarea textarea.md-textarea:focus:not([readonly]) {
        border-bottom: 1px solid #ffa000;
        box-shadow: 0 1px 0 0 #ffa000;
    }
    .amber-textarea.md-form .prefix.active {
        color: #ffa000;
    }

    .active-pink-textarea-2 textarea.md-textarea {
        border-bottom: 1px solid #f48fb1;
        box-shadow: 0 1px 0 0 #f48fb1;
    }
    .active-pink-textarea-2.md-form label.active {
        color: #f48fb1;
    }
    .active-pink-textarea-2.md-form label {
        color: #f48fb1;
    }
    .active-pink-textarea-2.md-form .prefix {
        color: #f48fb1;
    }

    .active-amber-textarea-2 textarea.md-textarea {
        border-bottom: 1px solid #ffa000;
        box-shadow: 0 1px 0 0 #ffa000;
    }
    .active-amber-textarea-2.md-form label.active {
        color: #ffa000;
    }
    .active-amber-textarea-2.md-form label {
        color: #ffa000;
    }
    .active-amber-textarea-2.md-form .prefix {
        color: #ffa000;
    }
</style>
