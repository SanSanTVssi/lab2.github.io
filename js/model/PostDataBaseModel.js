import {ExceptionHandleService} from "../ExceptionHandleService.js";

export default class PostDataBaseModel
{
    constructor(container)
    {
        this.postsStorageService = container.GetInstance("postsStorageService");
        this.posts = JSON.parse(this.postsStorageService.GetData()) ?? [];

        this.onChangeCallback = null;
    }

    Append(post)
    {
        post.onChangeCallback = this.onChangeCallback;
        try
        {
            this.posts.push(post);
            this._save();
        }
        catch (ex)
        {
            ExceptionHandleService.ShowUiException("Post creating error");
        }

        return true;
    }

    Remove(postId)
    {
        try
        {
            this.posts.splice(this.posts.findIndex(item => item.id === postId), 1);
            this._save();
        }
        catch (ex)
        {
            ExceptionHandleService.ShowUiException("Post removing error");
        }

        return true;
    }

    _save = () => this.postsStorageService.AppendData(JSON.stringify(this.posts));
}
