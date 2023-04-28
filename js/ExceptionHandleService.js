import {PopUp} from "./PopUp.js";

export class ExceptionHandleService
{
    static ShowUiException(msg) {
        console.error(msg);
        PopUp.ShowMessageWithOkButton(msg)
    }
}