import PostView from './PostView.js';

export default class PostsListView {
    constructor(postListModel, usersModel) {
        this.postListModel = postListModel;
        this.usersModel = usersModel
        this.controllerOnAddItem = null;
        this.controllerOnDelItem = null;

        document.querySelector('#posts')?.addEventListener('click', (e) => this.onClick(e));
    }

    setControllerOnAddItem(controllerOnAddItem) {
        this.controllerOnAddItem = controllerOnAddItem;
    }

    setControllerOnDelItem(controllerOnDelItem) {
        this.controllerOnDelItem = controllerOnDelItem;
    }

    onClick(e) {
        if (e.target.className === 'del-button') {
            this.controllerOnDelItem(e.target.dataset.id);
        }
    }

    onAddItem(e) {
        e.preventDefault()

        console.log(this)
        let user = this.usersModel.currentUser
        let author = user.firstName + " " + user.lastName

        const img = document.querySelector('#post-image')?.value
        const title = document.querySelector('#post-title')?.value
        const description = document.querySelector('#post-description')?.value

        this.controllerOnAddItem(img, title, description, author);
    }

    toHtml() {
        return this.postListModel.posts.map(item => {
            const itemView = new PostView(item);
            return itemView.toHtml();
        }).join("");
    }
}
