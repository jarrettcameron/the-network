import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {
    async likePost(postId) {
        const response = await api.post(`/api/posts/${postId}/like`)
        let post = AppState.posts.find(x => x.id == postId)
        if (post == null) {
            post = AppState.currentProfilePosts.find(x => x.id == postId)
        }
        post.likeIds = response.data.likeIds
    }

    async post(formData) {
        const response = await api.post('/api/posts', formData)
        AppState.posts.unshift(new Post(response.data))
    }

    async edit(id, formData) {
        const response = await api.put(`/api/posts/${id}`, formData)
        let post = AppState.posts.find(x => x.id == id)
        if (post == null) {
            post = AppState.currentProfilePosts.find(x => x.id == id)
        }
        post.imgUrl = response.data.imgUrl
        post.body = response.data.body
        AppState.editingPost = null
    }

    async deletePost(postId) {
        await api.delete(`/api/posts/${postId}`)
        let x = true
        let index = AppState.posts.findIndex(x => x.id == postId)
        if (index == -1) {
            index = AppState.currentProfilePosts.findIndex(x => x.id == postId)
            if (index == -1) return
            x = false
        }
        if (x) {
            AppState.posts.splice(index, 1)
        } else {
            AppState.currentProfilePosts.splice(index, 1)
        }

    }

    async getPostsFromQuery(query) {
        AppState.posts = null
        const response = await api.get(`/api/posts?query=${query}&page=${AppState.currentPage}`)
        AppState.posts = response.data.posts.map(x => new Post(x))
        AppState.totalPages = response.data.totalPages
    }

    async loadPosts() {
        const response = await api.get(`/api/posts?page=${AppState.currentPage}`)
        AppState.posts = response.data.posts.map(x => new Post(x))
        AppState.totalPages = response.data.totalPages
    }

    async loadPostsByUser(creatorId) {
        const response = await api.get(`/api/posts?creatorId=${creatorId}&page=${AppState.currentPage}`)
        AppState.currentProfilePosts = response.data.posts.map(x => new Post(x))
        AppState.totalPages = response.data.totalPages
    }
}

export const postsService = new PostsService()