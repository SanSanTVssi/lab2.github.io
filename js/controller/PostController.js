import {Post} from "../model/Post.js";

export default class PostController
{
    constructor(container)
    {
        this.postListModel = container.GetInstance("postListModel");
        this.postListView = container.GetInstance("postListView");

        this.postListModel.onChangeCallback = (e) => this._onChangeCallback(e);
        this.postListView.SetControllerOnAddItem(this._appendPost);
        this.postListView.SetControllerOnDelItem(this._removePost);

        document.querySelector('#add-post')?.addEventListener('click', (e) => this.postListView.onAddItem(e));

        this._onChangeCallback()
    }

    _onChangeCallback()
    {
        let posts = document.querySelector('#posts')
        if (posts)
        {
            posts.innerHTML = this.postListView.toHtml();
        }
    }

    _appendPost(image, title, description, author, body)
    {
        const post = new Post(image, title, description, author, body);
        this.postListModel.Append(post);
        localStorage.setItem("current_post_title", post.title);
        localStorage.setItem("current_post_img", post.image);
        localStorage.setItem("current_post_text", post.body);
        window.location.href = "../pages/showPost.html";
    }

    _removePost = (id) => this.postListModel.Remove(id);

    Run()
    {
        let posts = document.querySelector('#posts')

        if (!posts) return

        let handler =
            {
            set: (obj, prop, val) =>
            {
                obj[prop] = val;
                posts.innerHTML = this.postListView.toHtml();
                return true;
            }
        }

        this.postListModel.posts = new Proxy(this.postListModel.posts, handler);
    }
}
