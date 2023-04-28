import db from "./database.json" assert {type: "json"};

export default class PostListModel {
    constructor() {
        let postsLocalStorage = JSON.parse(localStorage.getItem("posts"));

        if (!postsLocalStorage) {
            this.posts = JSON.parse(JSON.stringify(db));
        } else {
            this.posts = postsLocalStorage
        }


        this.onChangeCallback = null;
    }

    add(post) {
        post.onChangeCallback = this.onChangeCallback;
        this.posts.push(post);
        this.save();
    }

    delete(postId) {
        const postIndex = this.posts.findIndex(item => item.id === postId);
        this.posts.splice(postIndex, 1);
        this.save();
    }

    save() {
        localStorage.setItem("posts", JSON.stringify(this.posts))
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}
