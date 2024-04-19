<script setup>
import { Post } from '../models/Post.js';

defineProps({ post: Post })
</script>


<template>
    <div class="bg-white p-4 px-xl-5 rounded shadow my-3">
        <div class="row align-items-center">
            <div class="col-xl-2 col-3 text-center">
                <router-link :to="{name: 'Profile', params: { profileId: post.creatorId }}">
                    <img :src="post.creator.picture" class="w-75 pfp" alt="">
                    <h6 class="mt-3 text-body">{{ post.creator.name }}</h6>
                </router-link>
            </div>
            <div class="col">
                <img v-if="post.imgUrl != ''" :src="post.imgUrl" class="post img-fluid w-100 rounded border">
                <p class="mt-2 form-control">{{ post.body }}</p>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .post {
        max-height: 300px;
        object-fit: cover;
        object-position: center;
    }

    .form-control {
        border: none !important;
    }
</style>