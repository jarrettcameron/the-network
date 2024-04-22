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
        Pop.error(error);
    }
}

async function loadProfiles() {
    try {
        await profilesService.getProfileFromQuery(query.value)
    }
    catch (error){
        Pop.error(error);
    }
}

onMounted(() => {
    loadPosts()
    loadProfiles()
})

watch(query, (nv) => {
    loadPosts()
    loadProfiles()
})
</script>


<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-9">
                <h1>Showing Results for '{{ query }}'</h1>
            </div>
            <div class="col-9 mt-4">
                <h2>Posts</h2>
                <PostCard v-for="post in posts" :key="post.key" :post="post"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>