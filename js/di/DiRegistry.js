import {Container} from "./Container.js";
import CustomerModel from "../model/CustomerModel.js";
import CustomerView from "../view/CustomerView.js";
import CustomerController from "../controller/CustomerController.js";
import PostDataBaseModel from "../model/PostDataBaseModel.js";
import PostListView from "../view/PostListView.js";
import PostController from "../controller/PostController.js";
import {LocalStorageService} from "../model/LocalStorageService.js";
import {CookieService} from "../model/CookieService.js";

export class DiRegistry
{
    static ContainerInstance;
    static Register()
    {
        const container = new Container();

        container.RegisterSingletonAtPlace("customersService", () => new LocalStorageService("customers"));
        container.RegisterSingletonAtPlace("postsStorageService", () => new LocalStorageService("posts"));
        container.RegisterSingletonAtPlace("customerService", () => new LocalStorageService("currentCustomer"))

        container.RegisterSingleton("customerModel", CustomerModel);
        container.RegisterSingleton("customerView", CustomerView);
        container.RegisterSingleton("customerController", CustomerController);

        container.RegisterSingleton("postListModel", PostDataBaseModel);
        container.RegisterSingleton("postListView", PostListView);
        container.RegisterSingleton("postController", PostController);

        DiRegistry.ContainerInstance = container;
        return container;
    }
}