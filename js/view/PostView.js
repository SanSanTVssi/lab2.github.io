export default class PostView {
    constructor(postModel) {
        this.postModel = postModel;
        this.postModelJson = JSON.stringify(postModel);
    }

    toHtml() {
        return `
            <div class="col-md-6">
            <div class="card mb-4">
                <div class="fixed-height-container">
                    <img class="card-img-top" src="${this.postModel.image}" alt="Post image">
                </div>
                <div class="card-body">
                    <h2 class="card-title">${this.postModel.title}</h2>
                    <p class="card-text">
                        ${this.postModel.description}
                    </p>
                    <a href="./pages/showPost.html" onclick="localStorage.setItem(\`current_post_title\`, \`${this.postModel.title}\`); localStorage.setItem(\`current_post_text\`, \`${this.postModel.body}\`); localStorage.setItem(\`current_post_img\`, \`${this.postModel.image}\`)" class="btn btn-primary">Read more &rarr;</a>
                </div>
                <div class="card-footer text-muted">
                    Posted by <a href="#">${this.postModel.author}</a> on ${this.postModel.postDate}
                </div>
            </div>
        </div>
        `;
    }
}
