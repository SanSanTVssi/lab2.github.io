import {Container} from "./Container.js";
import CustomerModel from "../model/CustomerModel.js";
import CustomerView from "../view/CustomerView.js";
import CustomerController from "../controller/CustomerController.js";
import PostDataBaseModel from "../model/PostDataBaseModel.js";
import PostListView from "../view/PostListView.js";
import PostController from "../controller/PostController.js";
import {StorageService} from "../model/StorageService.js";

export class DiRegistry
{
    static Register()
    {
        const container = new Container();

        container.RegisterSingletonAtPlace("customersService", () => new StorageService("customers"));
        container.RegisterSingletonAtPlace("postsStorageService", () => new StorageService("posts"));

        container.RegisterSingleton("customerModel", CustomerModel);
        container.RegisterSingleton("customerView", CustomerView);
        container.RegisterSingleton("customerController", CustomerController);

        container.RegisterSingleton("postListModel", PostDataBaseModel);
        container.RegisterSingleton("postListView", PostListView);
        container.RegisterSingleton("postController", PostController);

        return container;
    }
}