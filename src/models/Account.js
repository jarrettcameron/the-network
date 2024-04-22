export class Account {
    constructor(data) {
        this.id = data.id || data._id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        // TODO add additional properties if needed
        this.coverImg = data.coverImg
        this.bio = data.bio || ""
        this.graduated = data.graduated
        this.class = data.class || (data.graduated ? "Unlisted Class" : "Not Enrolled")
        this.github = data.github
        this.linkedin = data.linkedin
    }
}
