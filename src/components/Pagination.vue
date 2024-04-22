<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { pagesService } from '../services/PagesService';

const page = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
</script>


<template>
<div class="col-lg-9 col-11 my-3 mb-5">
    <div class="row text-center">
        <div class="col-4">
            <button class="btn page w-100" :disabled="page == 1" @click="pagesService.changePage(page - 1)">Previous Page</button>
        </div>
        <div class="col-4" style="user-select: none;">
            Page {{ page }} of {{ totalPages }}
        </div>
        <div class="col-4">
            <button class="btn page w-100" :disabled="page == totalPages" @click="pagesService.changePage(page + 1)">Next Page</button>
        </div>
    </div>
    </div>
</template>


<style lang="scss" scoped>
.btn:disabled {
    border:none;
}
</style>