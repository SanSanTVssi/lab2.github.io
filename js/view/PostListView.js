import PostView from './PostView.js';

export default class PostsListView {
    constructor(container) {
        this.postListModel = container.GetInstance("postListModel");
        this.customerModel = container.GetInstance("customerModel");
        this.controllerOnAddItem = null;
        this.controllerOnDelItem = null;

        document.querySelector('#posts')?.addEventListener('click', (e) => this._onClick(e));
    }

    SetControllerOnAddItem(controllerOnAddItem) {
        this.controllerOnAddItem = controllerOnAddItem;
    }

    SetControllerOnDelItem(controllerOnDelItem) {
        this.controllerOnDelItem = controllerOnDelItem;
    }

    _onClick(e) {
        if (e.target.className === 'del-button') {
            this.controllerOnDelItem(e.target.dataset.id);
        }
    }

    onAddItem(e) {
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

    toHtml() {
        return this.postListModel.posts.map
        ( item =>
            {
                const itemView = new PostView(item);
                return itemView.toHtml();
            }
        ).join("");
    }
}
