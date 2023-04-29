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
        this.posts.push(post);
        this._save();
    }

    Remove(postId)
    {
        this.posts.splice(this.posts.findIndex(item => item.id === postId), 1);
        this._save();
    }

    _save()
    {
        this.postsStorageService.AppendData(JSON.stringify(this.posts))
    }
}
