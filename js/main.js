import {DiRegistry} from "./di/DiRegistry.js";

const container = DiRegistry.Register();

const customerController = container.GetInstance("customerController");
customerController.Run();

const postController = container.GetInstance("postController");
postController.Run();
