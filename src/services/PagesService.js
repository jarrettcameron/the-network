import { AppState } from "../AppState"


class PagesService {
    changePage(page) {
        AppState.currentPage = page
    }
}

export const pagesService = new PagesService()