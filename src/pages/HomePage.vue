<script setup>
import { computed, onMounted, watch } from "vue";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)

async function getPosts() {
    try {
        await postsService.loadPosts()
    } catch (error) {
        Pop.error("A problem occurred while loaded posts. Please try again later.")
    }
}

onMounted(() => {
    AppState.currentPage = 1
    getPosts()
})

const page = computed(() => AppState.currentPage)
watch(page, (nv, ov) => {
    if (nv != ov) {
        document.querySelector('#feed').scrollIntoView()
        AppState.posts = null
        getPosts()
    }
})
</script>

<template>
  <div class="mt-4 container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-9 col-xl-7 col-xxl-6 col-11">
        <PostForm v-if="account" />
      </div>
      <div class="w-100"></div>
      <div class="col-lg-9 col-xl-7 col-xxl-6 col-11 my-3 text-center" id="feed" v-if="account">
        <hr />
      </div>
      <div class="w-100"></div>
      <div class="col-lg-9 col-xl-7 col-11 my-1" v-for="post in posts" :key="post">
        <PostCard :post="post" />
      </div>
      <Pagination/>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
