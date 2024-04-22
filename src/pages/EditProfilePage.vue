<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { AppState } from '../AppState';
import { validationService } from '../services/ValidationService';
import Pop from '../utils/Pop';
import { profilesService } from '../services/ProfilesService';


    const account = computed(() => AppState.account)
    const formData = ref({
        coverImg: '',
        picture: '',
        class: '',
        graduated: false,
        github: '',
        linkedin: '',
        resume: '',
        bio: ''
    })

    watch(account, (nv) => {
        let nnv = {...nv}
        if (nnv.class == "Not Enrolled") nnv.class = ''
        nnv = validationService.quickValidation(nnv)
        formData.value = nnv
    })

    onMounted(() => {
        let nnv = {...account.value}
        if (nnv.class == "Not Enrolled") nnv.class = ''
        nnv = validationService.quickValidation(nnv)
        formData.value = nnv
    })

    async function updateProfile() {
        try {
            await profilesService.updateProfile(validationService.repopulate(formData.value))
            Pop.success('Saved profile!')
        }
        catch (error){
            console.error(error)
        Pop.error("A problem occurred while saving your profile. Please try again later.");
        }
    }
</script>


<template>
    <div class="container-fluid">
        <div class="row justify-content-center mt-5">
            <div v-if="account" class="col-11">
                <form @submit.prevent="updateProfile()">
                    <h1 class="text-center">Edit Profile</h1>
                    <div class="row mt-5">
                        <div class="col-lg-6 col-12 mb-3">
                            <div class="input-group">
                                <label class="px-3 bg-white input-group-text">https://</label>
                                <input class="form-control" type="text" required placeholder="Cover Image URL" v-model="formData.coverImg">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12 mb-3">
                            <div class="input-group">
                                <label class="px-3 bg-white input-group-text">https://</label>
                                <input class="form-control" type="text" required placeholder="Profile Picture URL" v-model="formData.picture">
                            </div>
                        </div>
                        <div class="col-xl-9 col-8 mb-3">
                            <div class="input-group">
                                <input class="form-control" type="text" placeholder="Graduating Class" v-model="formData.class">
                            </div>
                        </div>
                        <div class="col-xl-3 col-4 mb-3 d-flex align-items-center gap-2 bg-white border rounded">
                            <input type="checkbox" class="form-check-input mb-1" v-model="formData.graduated">
                            <label class="form-check-label">Graduated</label>
                        </div>
                        <div class="col-lg-6 col-12 mb-3">
                            <div class="input-group">
                                <label class="px-3 bg-white input-group-text">https://github.com/</label>
                                <input class="form-control" type="text" placeholder="Username" v-model="formData.github">
                            </div>
                        </div>
                        <div class="col-lg-6 col-12 mb-3">
                            <div class="input-group">
                                <label class="px-3 bg-white input-group-text">https://linkedin.com/</label>
                                <input class="form-control" type="text" placeholder="Username" v-model="formData.linkedin">
                            </div>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="input-group">
                                <label class="px-3 bg-white input-group-text">https://</label>
                                <input class="form-control" type="text" placeholder="Resume URL" v-model="formData.resume">
                            </div>
                        </div>
                        <div class="col-12 mb-3">
                            <textarea class="form-control" placeholder="Bio" v-model="formData.bio"></textarea>
                        </div>
                        <div class="col-12 text-center">
                            <button class="btn btn-primary px-5 mt-4">Save Changes</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .form-control {
        border: none !important;
        background: linear-gradient(90deg, rgba(var(--bs-primary-rgb), 0.4), rgba(var(--bs-info-rgb), 0.4));
    }
</style>