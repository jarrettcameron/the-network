import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { api } from "./AxiosService.js"

class ProfilesService {
    async getProfileById(profileId) {
        AppState.currentProfile = null
        AppState.currentProfilePosts = null
        AppState.currentPage = 1
        const response = await api.get(`/api/profiles/${profileId}?page=${AppState.currentPage}`)
        AppState.currentProfile = new Account(response.data)
    }
}

export const profilesService = new ProfilesService()