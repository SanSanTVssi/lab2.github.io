import PostListModel from './model/PostListModel.js';
import PostListView from './view/PostListView.js';
import PostController from './controller/PostController.js';
import UsersModel from "./model/UsersModel.js";
import UsersView from "./view/UsersView.js";
import UserController from "./controller/UserController.js";

let usersModel = new UsersModel();
let usersView = new UsersView(usersModel);
let usersController = new UserController(usersModel, usersView);

usersController.initOnModelChange()

let postListModel = new PostListModel();
let postListView = new PostListView(postListModel, usersModel);
let controller = new PostController(postListModel, postListView);

controller.initOnModelChange()

