<script setup>
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";
import { computed, onMounted } from "vue";
import { AuthService } from "./services/AuthService";
import Pop from "./utils/Pop";
import { adsService } from "./services/AdsService";

const user = computed(() => AppState.user);
const account = computed(() => AppState.account);
const ads = computed(() => AppState.ads);

async function login() {
  AuthService.loginWithPopup();
}
async function logout() {
  AuthService.logout({ returnTo: window.location.origin });
}

async function loadAds() {
    try {
      await adsService.loadAds()
    }
    catch (error){
        console.error(error)
        Pop.error("A problem occurred while loading ads. Please try again later.");
    }
}

onMounted(() => {
    loadAds()
})
</script>

<template>
    <header class="container-fluid">
        <div class="row">
            <div class="col-xxl-3 col-xl-3 col-lg-4 col-4 d-lg-block d-none shadow bg-white px-5" style="min-height: 100dvh">
                <div v-if="user?.isAuthenticated" class="sticky-top">
                    <div class="row pt-5">
                        <div class="col-12 text-center">
                            <router-link :to="{ name: 'Profile', params: { profileId: account?.id || 'loading' }}">
                                <img :src="account?.picture || user?.picture" height="100" class="pfp border-3"/>
                            </router-link>
                        </div>
                        <div class="col-12 mt-4">
                            <span class="fst-italic text-secondary">{{ account?.class }} <i v-if="account?.graduated" title="Graduated" class="mdi mdi-school"></i></span>
                            <br>
                            <span class="fs-4 fw-semibold">{{ account?.name }}</span>
                            <div class="fs-5 d-flex align-items-center gap-2 mt-2">
                                <i class="mdi mdi-github"></i>{{ account?.github.replaceAll('https://github.com/', '') || "Not Linked" }}
                            </div>
                            <div class="fs-5 d-flex align-items-center gap-2">
                                <i class="mdi mdi-linkedin"></i>{{ account?.linkedin.replaceAll('https://linkedin.com/', '') || "Not Linked" }}
                            </div>
                            <div class="fs-5 d-flex align-items-center gap-2">
                                <i class="mdi mdi-note-text-outline"></i><a class="text-body" v-if="account?.resume != ''" :href="account?.resume">View</a>{{ account?.resume ? '' : "Not Linked" }}
                            </div>
                        </div>
                        <div class="col-12 mt-3">
                            <router-link :to="{ name: 'Edit Profile' }" class="btn btn-outline-text w-100 mb-3">Edit Profile</router-link>
                            <button class="w-100 btn btn-outline-primary" @click="logout()">Logout</button>
                        </div>
                    </div>
                </div>
                <div v-else class="sticky-top">
                    <div class="row pt-5 mt-5">
                        <div class="col-12">
                            <h4>You are currently logged out.</h4>
                            <p class="mt-4">
                                Most features will be disabled without an account, to fully use this
                                application please login.
                            </p>
                            <button @click="login()" class="btn btn-outline-text w-100">Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xxl-9 col-xl-9 col-lg-8 col-12 p-0">
                <div class="row g-0 sticky-top">
                    <Navbar />
                </div>
                <div class="row g-0">
                    <main class="col-xl-10">
                        <div class="row g-0 d-xl-none justify-content-center">
                            <div class="col-lg-6 col-md-7 col-11 mt-4">
                                <a v-for="ad in ads" :key="ad.title" :href="'https://' + ad.linkURL" target="_blank"><img :src="ad.banner" class="img-fluid my-2" alt=""></a>
                            </div>
                        </div>
                        <div class="row g-0">
                            <router-view />
                        </div>
                    </main>
                    <div class="col-2 d-none d-xl-block mt-4 justify-content-center">
                        <a v-for="ad in ads" :key="ad.title" :href="'https://' + ad.linkURL" target="_blank"><img  :src="ad.tall" class="img-fluid mb-3 pe-3" alt=""></a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.funnyimage {
    max-height: 100px;
    object-fit: cover;
}
</style>
