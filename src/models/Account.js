export class Account {
    constructor(data) {
        this.id = data.id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        // TODO add additional properties if needed
        this.class = data.class || "Not Enrolled"
        this.coverImg = data.coverImg
        this.bio = data.bio || ""
    }
}
