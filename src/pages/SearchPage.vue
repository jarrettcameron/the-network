<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService';
import PostCard from '../components/PostCard.vue';


const route = useRoute()
const query = computed(() => route.params.query)
const posts = computed(() => AppState.posts)
const profileResults = computed(() => AppState.profileResults)

async function loadPosts() {
    try {
        await postsService.getPostsFromQuery(query.value)
    }
    catch (error){
        console.error(error)
        Pop.error("A problem occurred while loading posts. Please try again later.");
    }
}

async function loadProfiles() {
    try {
        await profilesService.getProfileFromQuery(query.value)
    }
    catch (error){
        console.error(error)
        Pop.error("A problem occurred while loading profiles. Please try again later.");
    }
}

onMounted(() => {
    AppState.currentPage = 1
    AppState.totalPages = 1
    loadPosts()
    loadProfiles()
})

watch(query, () => {
    AppState.currentPage = 1
    AppState.totalPages = 1
    loadPosts()
    loadProfiles()
})

const page = computed(() => AppState.currentPage)
watch(page, (nv, ov) => {
    if (nv != ov) {
        document.querySelector('#feed').scrollIntoView()
        AppState.posts = null
        loadPosts()
    }
})
</script>


<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-7 col-lg-9 col-xxl-5 col-xl-7 col-11">
                <h1>Showing Results for '{{ query }}'</h1>
            </div>
            <div class="w-100"></div>
            <div v-if="profileResults?.length > 0" class="col-md-7 col-lg-9 col-xxl-5 col-xl-7 col-11 mt-4">
                <h2>Users</h2>
                <div>
                    <router-link v-for="profile in profileResults" :to="{ name: 'Profile', params: { profileId: profile.id } }" :key="profile.id" class="card bg-white border-0 shadow py-4 px-5 my-3">
                        <div class="d-flex gap-4 align-items-center">
                            <img :src="profile.picture" class="pfp" height="100" alt="">
                            <div>
                                <h4>{{ profile.name }}</h4>
                                <h6 class="text-secondary">{{ profile.class }} <i v-if="profile.graduated" title="Graduated" class="mdi mdi-school"></i></h6>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="w-100"></div>
            <div v-if="posts?.length > 0" class="col-md-7 col-lg-9 col-xxl-5 col-xl-7 col-11 mt-4" id="feed">
                <h2>Posts</h2>
                <PostCard v-for="post in posts" :key="post.id" :post="post"/>
            </div>
            <Pagination v-if="posts?.length != 0"/>
            <div v-if="profileResults?.length == 0 && posts?.length == 0" class="col-xxl-7 col-xl-8 col-lg-9 col-11 mt-4">
                <span class="fs-5 text-secondary">No results found.</span>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>