import {Post} from "../model/Post.js";
import {ExceptionHandleService} from "../ExceptionHandleService.js";

export default class PostController
{
    constructor(container)
    {
        this.postDataBaseModel = container.GetInstance("postDataBaseModel");
        this.postDataBaseView = container.GetInstance("postDataBaseView");

        this.postDataBaseModel.onChangeCallback = (e) => this._onChangeCallback(e);
        this.postDataBaseView.controllerOnAddItem = this._appendPost;
        this.postDataBaseView.controllerOnDelItem = this._removePost;

        document.querySelector('#add-post')?.addEventListener('click', (e) => this.postDataBaseView.onAddItem(e));

        this._onChangeCallback()
    }

    _onChangeCallback()
    {
        let posts = document.querySelector('#posts')
        if (posts)
        {
            posts.innerHTML = this.postDataBaseView.ToHtml();
        }
    }

    _appendPost(image, title, description, author, body)
    {
        try
        {
            const post = new Post(image, title, description, author, body);
            this.postDataBaseModel.Append(post);
            localStorage.setItem("current_post_title", post.title);
            localStorage.setItem("current_post_img", post.image);
            localStorage.setItem("current_post_text", post.body);
            window.location.href = "../pages/showPost.html";
        }
        catch (ex)
        {
            ExceptionHandleService.ShowUiException(ex);
        }
    }

    _removePost = (id) => this.postDataBaseModel.Remove(id);

    Run()
    {
        let posts = document.querySelector('#posts')

        if (!posts) return

        let handler =
            {
            set: (obj, prop, val) =>
            {
                obj[prop] = val;
                posts.innerHTML = this.postDataBaseView.ToHtml();
                return true;
            }
        }

        this.postDataBaseModel.posts = new Proxy(this.postDataBaseModel.posts, handler);
    }
}
