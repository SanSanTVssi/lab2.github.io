import {Post} from "../model/Post.js";

export default class PostController {
    constructor(postListModel, postListView) {
        this.postListModel = postListModel;
        this.postListView = postListView;

        this.postListModel.setOnChangeCallback((e) => this.onChangeCallback(e));
        this.postListView.setControllerOnAddItem(this.addItem);
        this.postListView.setControllerOnDelItem(this.delItem);

        document.querySelector('#add-post')?.addEventListener('click', (e) => postListView.onAddItem(e));

        this.onChangeCallback()
    }

    onChangeCallback() {
        let posts = document.querySelector('#posts')
        if (posts) {
            posts.innerHTML = this.postListView.toHtml();
        }
    }

    addItem(image, title, description, author) {
        const post = new Post(image, title, description, author);
        this.postListModel.add(post);
    }

    delItem(id) {
        this.postListModel.delete(id);
    }

    initOnModelChange() {
        let posts = document.querySelector('#posts')

        if (!posts) return

        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                posts.innerHTML = this.postListView.toHtml();
                return true;
            }
        }

        this.postListModel.posts = new Proxy(this.postListModel.posts, handler);
    }
}
