import {DiRegistry} from "./di/DiRegistry.js";
import {ExceptionHandleService} from "./ExceptionHandleService.js";

class MainService
{
    Run()
    {
        try
        {
            const container = DiRegistry.Register();

            const customerController = container.GetInstance("customerController");
            customerController.Run();

            const postController = container.GetInstance("postController");
            postController.Run();
        }
        catch (ex)
        {
            ExceptionHandleService.ShowUiException(`Fatal error while loading site: ${ex}`);
        }
    }
}

new MainService().Run();
