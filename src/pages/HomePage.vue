<script setup>
import { computed, onMounted, watch } from "vue";
import { AppState } from "../AppState.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import { pagesService } from "../services/PagesService.js";

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)
const page = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

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

function scroll() {
    document.querySelector('#feed').scrollIntoView()
}

watch(page, (nv, ov) => {
    if (nv != ov) {
        scroll()
        getPosts()
    }
})
</script>

<template>
  <div class="mt-4 container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-9 col-11">
        <PostForm v-if="account" />
      </div>
      <div class="col-lg-9 col-11 my-3 text-center" id="feed" v-if="account">
        <hr />
      </div>
      <div class="col-lg-9 col-11 my-1" v-for="post in posts" :key="post">
        <PostCard :post="post" />
      </div>
      <div class="col-lg-9 col-11 my-3 mb-5">
        <div class="row text-center">
            <div class="col-4">
                <button class="btn w-100" :disabled="page == 1" @click="pagesService.changePage(page - 1)">Previous Page</button>
            </div>
            <div class="col-4">
                Page {{ page }} of {{ totalPages }}
            </div>
            <div class="col-4">
                <button class="btn w-100" :disabled="page == totalPages" @click="pagesService.changePage(page + 1)">Next Page</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn:disabled {
    border:none;
}
</style>
