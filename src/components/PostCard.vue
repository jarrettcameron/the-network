<script setup>
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";

defineProps({ post: Post });

async function deletePost(post) {
    try {
        let confirmation = await Pop.confirm('Are you sure you want to delete this post?')
        if (!confirmation) return
        await postsService.deletePost(post.id)
    }
    catch (error){
      Pop.error(error);
    }
}

async function likePost(post) {
  if (!AppState.account) return
  try {
        await postsService.likePost(post.id)
    }
    catch (error){
      Pop.error(error);
    }
}

function edit(post) {
  AppState.editingPost = post
  let elm = document.querySelector('#post')
  elm.scrollIntoView({ block: 'end' }) // Scrolls to form
}

</script>

<template>
  <div class="bg-white rounded shadow my-3">
    <div class="row align-items-center">
      <div class="col-12 pt-3 px-5 mx-3">
        <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } } " class="d-flex align-items-center gap-3">
          <img :src="post.creator.picture" height="100" class="pfp" alt="" />
          <div class="pt-3">
              <h6 class="text-secondary">{{ post.creator.class || "Not Enrolled" }}</h6>
              <h4 class="text-body">{{ post.creator.name }}</h4>
              <p class="text-secondary fst-italic">{{ post.postDateString }}</p>
          </div>
        </router-link>
      </div>
      <div class="col-12 mt-3" v-if="post.imgUrl != ''">
        <img
          :src="post.imgUrl"
          class="post w-100"
        />
      </div>
      <div class="col-12 px-5" :class="post.imgUrl != '' ? 'py-4' : 'mb-4'">
        
        <p class="mt-2 form-control w-100">{{ post.body }}</p>
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <div v-if="post.creatorId == AppState.account?.id" class="d-flex gap-sm-3 gap-1">
                    <button class="btn btn-primary px-md-4" @click="edit(post)"><i class="mdi mdi-draw"></i> EDIT</button>
                    <button class="btn btn-info px-md-4" @click="deletePost(post)"><i class="mdi mdi-delete"></i> DELETE</button>
                </div>
            </div>
            <div class="d-flex gap-2 text-info align-items-center" :class="{ 'pointer': AppState.account }" @click="likePost(post)">
                <i class="mdi" :class="post.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"></i>{{ post.likeIds.length }}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
    min-width: 100% !important;
    object-fit: contain;
    border: none;
}

.form-control {
  border: none !important;
  overflow-wrap: break-word;
}
</style>
