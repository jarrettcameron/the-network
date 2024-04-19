<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

const posts = computed(() => AppState.posts)

const account = computed(() => AppState.account)

async function getPosts() {
    try {
        await postsService.loadPosts()
    }
    catch (error){
      Pop.error("A problem occured while loaded posts. Please try again later.");
    }
}

onMounted(() => {
    getPosts()
})
</script>

<template>
    <div class="mt-4 container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <PostForm v-if="account"/>
            </div>
            <div class="col-lg-9 my-3 text-center">
                <hr>
            </div>
            <div class="col-lg-9 my-1" v-for="post in posts" :key="post">
                <PostCard :post="post"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
