<script setup>
import { AppState } from "./AppState";
import Navbar from "./components/Navbar.vue";
import { computed } from "vue";
import { AuthService } from "./services/AuthService";

const user = computed(() => AppState.user);
const account = computed(() => AppState.account);

async function login() {
  AuthService.loginWithPopup();
}
async function logout() {
  AuthService.logout({ returnTo: window.location.origin });
}
</script>

<template>
  <header class="container-fluid">
    <div class="row">
      <div
        class="col-xxl-2 col-lg-3 col-4 d-lg-block d-none shadow bg-white px-5"
        style="min-height: 100dvh"
      >
        <div v-if="user?.isAuthenticated" class="sticky-top">
          <div class="row pt-5">
            <div class="col-12 text-center">
              <img
                :src="account?.picture || user?.picture"
                height="100"
                class="pfp border-3"
              />
            </div>
            <div class="col-12 mt-4">
              <span class="fst-italic text-secondary">{{ account?.class }}</span
              ><br />
              <span class="fs-4 fw-semibold">{{ account?.name }}</span>
            </div>
            <div class="col-12">
              <button class="w-100 btn btn-outline-info" @click="logout()">Logout</button>
            </div>
          </div>
        </div>
        <div v-else class="sticky-top">
          <div class="row pt-5">
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
      <div class="col-xxl-10 col-lg-9 col-12 p-0">
        <div class="row g-0 sticky-top">
          <Navbar />
        </div>
        <div class="row g-0">
          <main>
            <router-view />
          </main>
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
</style>
