<script setup>
import { computed, onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import { AppState } from '../AppState.js';
import { AuthService } from '../services/AuthService.js';

const user = computed(() => AppState.user)
const account = computed(() => AppState.account)

const searchQuery = ref('')

const theme = ref(loadState('theme') || 'dark')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

async function login() {
  AuthService.loginWithPopup();
}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-gradient px-3 justify-content-between">
    <router-link v-if="account" :to="{ name: 'Profile', params: { profileId: account?.id || 'loading' }}">
        <img  :src="account?.picture || user?.picture" height="40" class="pfp d-lg-none">
    </router-link>
    <button v-else class="btn d-lg-none" @click="login()">LOGIN</button>
    <router-link class="navbar-brand px-0 mx-0 d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center gap-2 fw-bold">
        <i class="mdi mdi-lan fs-2"></i><span class="d-lg-block d-none"> TheNetwork</span>
      </div>
    </router-link>
    <button class="navbar-toggler outline-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <!-- <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li> -->
      </ul>

      <div class="me-lg-3 mt-lg-0 mt-3">
        <form>
          <div class="input-group">
            <input class="form-control text-light" type="text" placeholder="Search" v-model="searchQuery">
            <router-link :to="{name: 'Search', params: { query: searchQuery || 'none' }}" class="btn btn-light px-2 py-0"><i class="text-info fs-4 mdi mdi-magnify"></i></router-link>
          </div>
        </form>
      </div>

      <div class="mt-lg-0 mt-2">
        <button class="btn text-light d-flex align-items-center gap-2" @click="toggleTheme"
          :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
          <i class="mdi fs-5" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i><span class="d-lg-none">{{ theme == 'light' ? 'Switch to Dark mode' : 'Switch to Light mode' }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>

.form-control,.form-control:focus {
  outline: none !important;
  border: none !important;
  background-color: rgba(255, 255, 255, 0.2);
}

.form-control::placeholder {
    color: var(--bs-body);
    font-weight: 500;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 992px) {
  nav {
    height: 64px;
  }
}

.navbar-toggler {
    padding: 0;
}
</style>
