import PostView from './PostView.js';
import {ExceptionHandleService} from "../ExceptionHandleService.js";

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
        try
        {
            if (e.target.className.includes('del-button'))
            {
                this.controllerOnDelItem(e.target.dataset.id);
            }
        }
        catch (ex)
        {
            ExceptionHandleService.ShowUiException(`Error removing post due the error: ${ex}`);
        }
    }

    onAddItem(e)
    {
        e.preventDefault()

        try
        {
            let customer = this.customerModel.currentCustomer
            let author = customer.gptName + " " + customer.gptFamily

            const img = document.querySelector('#post-image')?.value
            const title = document.querySelector('#post-title')?.value
            const description = document.querySelector('#post-description')?.value
            const body = document.querySelector('#post-body')?.value

            this.controllerOnAddItem(img, title, description, author, body);
        }
        catch (ex)
        {
            ExceptionHandleService.ShowUiException(`Error creating new post due the error: ${ex}`);
        }
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
