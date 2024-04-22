import { AppState } from "../AppState"
import { Ad } from "../models/Ad"
import { api } from "./AxiosService"

class AdsService {
    async loadAds() {
        const response = await api.get('/api/ads')
        AppState.ads = response.data.map(x => new Ad(x))
    }
}

export const adsService = new AdsService()