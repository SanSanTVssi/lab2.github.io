import {DiRegistry} from "./di/DiRegistry.js";
import {ExceptionHandleService} from "./ExceptionHandleService.js";

class MainService
{
    Run()
    {
        const container = DiRegistry.Register();

        const customerController = container.GetInstance("customerController");
        customerController.Run();

        const postController = container.GetInstance("postController");
        postController.Run();
    }
}

new MainService().Run();
