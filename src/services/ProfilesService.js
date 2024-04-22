import { AppState } from "../AppState.js"
import { Account } from "../models/Account.js"
import { api } from "./AxiosService.js"

class ProfilesService {
    async updateProfile(formData) {
        const response = await api.put('/account', formData)
        AppState.account = new Account(response.data)
    }

    async getProfileById(profileId) {
        AppState.currentProfile = null
        AppState.currentProfilePosts = null
        const response = await api.get(`/api/profiles/${profileId}`)
        AppState.currentProfile = new Account(response.data)
    }

    async getProfileFromQuery(query) {
        AppState.profileResults = null
        const response = await api.get(`/api/profiles?query=${query}`)
        AppState.profileResults = response.data.map(x => new Account(x))
    }
}

export const profilesService = new ProfilesService()