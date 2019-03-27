<template>
    <div style="text-align: left;" class="my-4">
        <h6 @click="$router.push('/')" class="pointtoit">Home</h6>
        <h6 style="color: #6b7077; font-size: 0.9em;" class="mt-3">PUBLIC</h6>
        <div class="ml-3">
            <h6 class="pointtoit">Questions</h6>
            <h6 class="pointtoit" @click="watchedTags">Watched Tags</h6>
            <h6 class="pointtoit" @click="tags">Tags</h6>
            <h6 class="pointtoit">User</h6>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    methods: {
        watchedTags() {
            this.$router.push('/watched-tags')
        },
        tags() {
            this.$router.push('/tags')
        }
    }
}
</script>

<style>
.pointtoit {
    cursor: pointer;
    color: #535d6b;
}
h6.pointtoit:hover {
    color: #000;
}
</style>
