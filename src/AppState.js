import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
    user: null,
    account: null,
    posts: [],
    currentProfile: null,
    currentProfilePosts: [],
    currentPage: 1,
    totalPages: 1,
    editingPost: null,
    profileResults: [],
    ads: []
})
