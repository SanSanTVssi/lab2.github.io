import PostView from './PostView.js';

export default class PostDataBaseView
{
    constructor(container)
    {
        this.postDataBaseModel = container.GetInstance("postDataBaseModel");
        this.customerModel = container.GetInstance("customerModel");
        this.controllerOnAddItem = null;
        this.controllerOnDelItem = null;

        document.querySelector('#posts')?.addEventListener('click', (e) => this._onRemovePost(e));
    }
    _onRemovePost(e)
    {
        if (e.target.className.includes('del-button'))
        {
            this.controllerOnDelItem(e.target.dataset.id);
        }
    }

    onAddItem(e)
    {
        e.preventDefault()

        console.log(this)
        let user = this.customerModel.currentCustomer
        let author = user.gptName + " " + user.gptFamily

        const img = document.querySelector('#post-image')?.value
        const title = document.querySelector('#post-title')?.value
        const description = document.querySelector('#post-description')?.value
        const body = document.querySelector('#post-body')?.value

        this.controllerOnAddItem(img, title, description, author, body);
    }

    ToHtml()
    {
        return this.postDataBaseModel.posts.map
        ( item =>
            {
                const itemView = new PostView(item);
                return itemView.ToHtml();
            }
        ).join("");
    }P
}
