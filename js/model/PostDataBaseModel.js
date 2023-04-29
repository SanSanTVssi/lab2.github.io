import db from "./database.json" assert {type: "json"};

export default class PostDataBaseModel
{
    constructor(container)
    {
        this.postsStorageService = container.GetInstance("postsStorageService");
        let posts = JSON.parse(this.postsStorageService.GetData());

        this._loadDataBase(posts)

        this.onChangeCallback = null;
    }

    Append(post)
    {
        post.onChangeCallback = this.onChangeCallback;
        this.posts.push(post);
        this._save();
        window.location.href = "../index.html";
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

    // This just imitation
    _loadDataBase(posts)
    {
        if (!posts)
        {
            this.posts = JSON.parse(JSON.stringify(db));
        } else
        {
            this.posts = posts
        }
    }
}
