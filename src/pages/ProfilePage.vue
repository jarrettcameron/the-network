<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';
import { postsService } from '../services/PostsService.js';
import Pagination from '../components/Pagination.vue';

const route = useRoute()

const profile = computed(() => AppState.currentProfile)
const posts = computed(() => AppState.currentProfilePosts)
const account = computed(() => AppState.account)

const message = ref("Loading...")

async function getPosts() {
    try {
      await postsService.loadPostsByUser(route.params.profileId)
    }
    catch (error){
      Pop.error("There was an issue loading profile posts. Please try again later.");
    }
}

async function loadProfile() {
    try {
      await profilesService.getProfileById(route.params.profileId)
    }
    catch (error){
      Pop.error("There was an issue loading that profile. Please try again later.");
      message.value = "There was an issue loading that profile. Please try again later."
    }
}

onMounted(() => {
    AppState.editingPost = null
    AppState.currentPage = 1
    AppState.currentProfilePosts = null
    loadProfile()
    getPosts()
})

const page = computed(() => AppState.currentPage)
watch(page, (nv, ov) => {
    if (nv != ov) {
        document.querySelector('#feed').scrollIntoView()
        getPosts()
    }
})

</script>


<template>
    <div v-if="profile" class="container-fluid">
        <div class="mt-5 row justify-content-center">
            <div class="col-xl-8 col-lg-9 col-11 card border-0 bg-white shadow p-0">
                <img :src="profile.coverImg" class="banner card-img-top" alt="">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div class="position-relative">
                            <div class="ms-2 position-absolute" style="top: -70px;">
                                <img :src="profile.picture" alt="" class="pfp shadow border-3" height="100">
                            </div>
                        </div>
                        <div class="text-end float-end d-flex gap-2 fs-5">
                                <a style="color: transparent; user-select: none;">
                                    <i class="mdi mdi-github"></i>
                                </a>
                                <a v-if="profile.github != ''" :href="profile.github" target="_blank" class="text-body">
                                    <i class="mdi mdi-github"></i>
                                </a>
                                <a v-if="profile.linkedin != ''" :href="profile.linkedin" target="_blank" class="text-body">
                                    <i class="mdi mdi-linkedin"></i>
                                </a>
                        </div>
                    </div>
                    <div class="p-4 pt-3">
                        <span class="d-block fst-italic text-secondary">{{ profile.class }} <i v-if="profile.graduated" title="Graduated" class="mdi mdi-school"></i></span>
                        <span class="d-flex fs-4 fw-semibold justify-content-between">
                            <div>{{ profile.name }}</div>
                            <div v-if="profile.id == account?.id">
                                <router-link :to="{ name: 'Edit Profile' }" class="px-4 btn btn-outline-text">Edit Profile</router-link>
                            </div>
                        </span>
                        <span v-if="profile.bio != ''" class="d-block mt-3 text-secondary fst-italic">{{ profile.bio  }}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-11 mt-5">
                <PostForm v-if="account?.id == profile?.id" />
            </div>
            <div class="col-lg-9 col-11">
                <hr v-if="account?.id == profile?.id">
            </div>
            <div class="col-lg-9 col-11" id="feed">
                <PostCard v-for="post in posts" :key="post.id" :post="post"/>
                <p v-if="posts?.length == 0" class="text-center text-secondary">This user hasn't made any posts yet.</p>
            </div>
            <Pagination v-if="posts?.length != 0"/>
        </div>
    </div>
    <div class="text-center mt-5 text-secondary" v-else>
        <h4>{{ message }}</h4>
    </div>
</template>


<style lang="scss" scoped>
    .banner {
        max-height: 125px;
        object-fit: cover;
        object-position: center;
    }
</style>