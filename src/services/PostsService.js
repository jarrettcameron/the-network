import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {
    async loadPosts() {
        const response = await api.get('/api/posts')
        AppState.posts = response.data.posts.map(x => new Post(x))
    }
}

export const postsService = new PostsService()