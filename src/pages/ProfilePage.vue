<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';

const route = useRoute()

const profile = computed(() => AppState.currentProfile)

const message = ref("Loading...")

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
    loadProfile()
})

</script>


<template>
    <div v-if="profile" class="container-fluid">
        <div class="mt-4 row justify-content-center">
            <div class="col-lg-9 col-11 card border-0 bg-white shadow p-0">
                <img :src="profile.coverImg" class="banner card-img-top" alt="">
                <div class="card-body">
                    <div class="d-flex">
                        <div class="position-relative">
                            <div class="ms-2 position-absolute" style="top: -70px;">
                                <img :src="profile.picture" alt="" class="pfp shadow border-3" height="100">
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 p-4">
                        <span class="fst-italic text-secondary">{{ profile.class }}</span>
                        <br>
                        <span class="fs-4 fw-semibold">{{ profile.name }}</span>
                        <span v-if="profile.bio != ''" class="d-block mt-3 text-secondary fst-italic">{{ profile.bio  }}</span>
                    </div>
                </div>
            </div>
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