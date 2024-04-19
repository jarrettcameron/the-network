export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl || ""
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = data.creator
    }

    get postDateString() {
        return `Posted ${this.formatDatetoRelative(this.createdAt)}${this.createdAt.getTime() == this.updatedAt.getTime() ? `` : ` (Edited ${this.formatDatetoRelative(this.updatedAt)})`}`
    }

    formatDatetoRelative(datee) {
        let current = new Date().getTime()
        let date = datee.getTime()
        let elapsed = current - date

        let msSecond = 1000
        let msMinute = msSecond * 60
        let msHour = msMinute * 60
        let msDay = msHour * 24
        let msMonth = msDay * 30

        if (elapsed < msMinute) {
            let x = Math.round(elapsed / msSecond)
            return `${x}s ago`
        } else if (elapsed < msHour) {
            let x = Math.round(elapsed / msMinute)
            return `${x}m ago`
        } else if (elapsed < msDay) {
            let x = Math.round(elapsed / msHour)
            return `${x}h ago`
        } else if (elapsed < msMonth) {
            let x = Math.round(elapsed / msDay)
            return `${x}d ago`
        } else {
            return datee.toLocaleDateString()
        }
    }
}

/**
 *
 *  {
    "_id": "66229c6311e26365c7f71023",
    "body": "You'll never guess who it is! If you need to check out a profile that has more than 20 posts, to test pagination, I'm your 🦧",
    "imgUrl": "https://static.wikia.nocookie.net/4bfb4d59-fbd2-42c7-9365-e3914f55c847",
    "creatorId": "63922fd4274d85e20428e306",
    "likeIds": [
        "63922fd4274d85e20428e306"
    ],
    "createdAt": "2024-04-19T16:31:31.902Z",
    "updatedAt": "2024-04-19T16:32:33.577Z",
    "__v": 1,
    "creator": {
        "_id": "63922fd4274d85e20428e306",
        "subs": [
            "auth0|63922fd3f27265590db73a6a"
        ],
        "email": "b.chilling@fast9.gov",
        "name": "Bob Bigus",
        "picture": "https://external-preview.redd.it/rHKyHWYDMBhXdD77GySZNrn7--6BHE2MAAo_6kvRA6w.png?width=640&crop=smart&format=pjpg&auto=webp&s=b714b97048a58f25381a68c3b1ea8be5feb27083",
        "bio": "",
        "coverImg": "https://external-preview.redd.it/rHKyHWYDMBhXdD77GySZNrn7--6BHE2MAAo_6kvRA6w.png?width=640&crop=smart&format=pjpg&auto=webp&s=b714b97048a58f25381a68c3b1ea8be5feb27083",
        "github": "https://github.com",
        "linkedin": "",
        "resume": "https://youtube.com",
        "class": "Every Class",
        "graduated": false,
        "createdAt": "2023-06-29T23:42:59.532Z",
        "updatedAt": "2024-04-18T18:09:59.241Z",
        "__v": 0,
        "id": "63922fd4274d85e20428e306"
    },
    "likes": [
        {
            "_id": "63922fd4274d85e20428e306",
            "name": "Bob Bigus",
            "picture": "https://external-preview.redd.it/rHKyHWYDMBhXdD77GySZNrn7--6BHE2MAAo_6kvRA6w.png?width=640&crop=smart&format=pjpg&auto=webp&s=b714b97048a58f25381a68c3b1ea8be5feb27083",
            "id": "63922fd4274d85e20428e306"
        }
    ],
    "id": "66229c6311e26365c7f71023"
}
 *
 *
 */