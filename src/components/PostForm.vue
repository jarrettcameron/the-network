<script setup>
import { computed, ref, watch } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";

const account = computed(() => AppState.account);
const editing = computed(() => AppState.editingPost);
let imageAttachment = ref(false)

const formData = ref({imgUrl: "", body: ""})

async function post() {
  try {
    await postsService.post(formData.value)
    formData.value = {imgUrl: "", body: ""}
  }
  catch (error){
    Pop.error(error);
  }
}

async function edit() {
  try {
    await postsService.edit(editing.value.id, formData.value)
    formData.value = {imgUrl: "", body: ""}
  }
  catch (error){
    Pop.error(error);
  }
}


watch(editing, (nv) => {
  if (nv == null) {
    imageAttachment.value = false
    return
  }
  formData.value.body = nv.body
  imageAttachment.value = nv.imgUrl != ""
  formData.value.imgUrl = nv.imgUrl
})

function toggleAttachment() {
  imageAttachment.value = !imageAttachment.value
  if (!imageAttachment.value) formData.value.imgUrl = ""
}

</script>

<template>
  <form v-if="!editing" @submit.prevent="post()" class="bg-white p-4 px-xl-5 rounded shadow my-4" id="post">
    <div class="row align-items-center">
      <div class="col-xl-2 col-3 text-center">
        <img :src="account?.picture" class="w-75 pfp" alt="" />
        <h6 class="mt-3 text-body">{{ account.name }}</h6>
      </div>
      <div class="col-xl-10 col-9">
        <textarea v-model="formData.body" name="" class="form-control" style="min-height: 125px" placeholder="Share what's happening"></textarea>
        <div class="mt-2 text-primary fw-semibold fs-5 d-flex justify-content-between w-100">
          <div class="d-flex gap-2 align-content-center pointer" @click="toggleAttachment()">
            <i class="mdi mdi-image"></i> Photo
          </div>
          <button class="d-flex text-primary fw-semibold gap-2 align-content-center pointer" style="background: none; border: none; outline: none;">
            <i class="mdi mdi-send"></i> Post
          </button>
        </div>
        <input v-model="formData.imgUrl" v-if="imageAttachment" type="url" class="form-control mt-3" placeholder="Image URL">
      </div>
    </div>
  </form>
  <form v-else @submit.prevent="edit()" class="bg-white p-4 px-xl-5 rounded shadow my-4" id="post">
    <div class="row align-items-center">
      <div class="col-xl-2 col-3 text-center">
        <img :src="account?.picture" class="w-75 pfp" alt="" />
        <h6 class="mt-3 text-body">{{ account.name }}</h6>
      </div>
      <div class="col-xl-10 col-9">
        <span class="text-secondary">You are editing an older post.</span>
        <textarea v-model="formData.body" name="" class="form-control mt-2" style="min-height: 125px" placeholder=""></textarea>
        <div class="mt-2 text-info fw-semibold fs-5 d-flex justify-content-between w-100">
          <div class="d-flex gap-2 align-content-center pointer" @click="toggleAttachment()">
            <i class="mdi mdi-image"></i> Photo
          </div>
          <button class="d-flex text-info fw-semibold gap-2 align-content-center pointer" style="background: none; border: none; outline: none;">
            <i class="mdi mdi-send"></i> Save Changes
          </button>
        </div>
        <input v-model="formData.imgUrl" v-if="imageAttachment" type="url" class="form-control mt-3" placeholder="Image URL">
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
