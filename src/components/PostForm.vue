<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)
</script>


<template>
    <div class="bg-white p-4 px-xl-5 rounded shadow my-4">
        <div class="row">
            <div class="col-xl-2 col-3 text-center">
                <img :src="account?.picture" class="mt-3 w-75 pfp" alt="">
            </div>
            <div class="col">
                <textarea name="" id="" class="form-control" style="height: 125px;"></textarea>
                <div class="mt-2 text-info fw-semibold fs-5 d-flex justify-content-between w-100">
                    <div class="d-flex gap-2 align-content-center">
                        <i class="mdi mdi-image"></i> Photo
                    </div>
                    <div class="d-flex gap-2 align-content-center">
                        <i class="mdi mdi-send"></i> Post
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>