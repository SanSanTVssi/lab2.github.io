import UserView from "./UserView.js";

export default class CustomerView {
    constructor(container)
    {
        this.customerModel = container.GetInstance("customerModel");

        this.controllerOnAddItem = null;
        this.controllerOnAuth = null;
        this.controllerOnLogout = null;
    }

    SetControllerOnAddItem(controllerOnAddItem)
    {
        this.controllerOnAddItem = controllerOnAddItem;
    }

    SetControllerOnAuth(controllerOnAuth)
    {
        this.controllerOnAuth = controllerOnAuth;
    }

    SetControllerOnLogout(controllerOnLogout)
    {
        this.controllerOnLogout = controllerOnLogout;
    }

    onAddItem(e)
    {
        e.preventDefault()

        const signUp = document.querySelector('#sign-up');

        const gpt_name = signUp["gpt_name"]?.value
        const gpt_family = signUp["gpt_family"]?.value
        const personal_token = signUp["personal_token"]?.value
        const private_key = signUp["private_key"]?.value
        const repeat_private_key = signUp["repeat_private_key"]?.value

        console.log("OnAddItem: ", gpt_name, gpt_family, personal_token, private_key, repeat_private_key);

        this.controllerOnAddItem(gpt_name, gpt_family, personal_token, private_key, repeat_private_key);
    }

    onAuth(e)
    {
        e.preventDefault()
        const signIn = document.querySelector('#sign-in')
        this.controllerOnAuth(signIn["personal_token"]?.value, signIn["private_key"]?.value)
    }

    onLogout(e)
    {
        e.preventDefault()

        this.controllerOnLogout()
    }

    toHtml()
    {
        return new UserView(this.customerModel.currentCustomer).toHtml();
    }
}
