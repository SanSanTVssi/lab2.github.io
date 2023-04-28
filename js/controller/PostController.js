import {Post} from "../model/Post.js";

export default class PostController {
    constructor(container) {
        this.postListModel = container.GetInstance("postListModel");
        this.postListView = container.GetInstance("postListView");

        this.postListModel.onChangeCallback = (e) => this.onChangeCallback(e);
        this.postListView.SetControllerOnAddItem(this._appendPost);
        this.postListView.SetControllerOnDelItem(this._removePost);

        document.querySelector('#add-post')?.addEventListener('click', (e) => this.postListView.onAddItem(e));

        this.onChangeCallback()
    }

    onChangeCallback() {
        let posts = document.querySelector('#posts')
        if (posts) {
            posts.innerHTML = this.postListView.toHtml();
        }
    }

    _appendPost(image, title, description, author) {
        const post = new Post(image, title, description, author);
        this.postListModel.Append(post);
    }

    _removePost(id) {
        this.postListModel.Remove(id);
    }

    Run() {
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
