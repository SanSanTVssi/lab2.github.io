import {Customer} from "../model/CustomerModel.js"
import {ExceptionHandleService} from "../ExceptionHandleService.js"

function checkCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return true;
        }
    }
    return false;
}

const isAuth = !!localStorage.getItem("currentCustomer") || checkCookie("currentCustomer");

let pageName = location.href.split("/").slice(-1).join();
let isAuthPage = pageName === "signIn.html" || pageName === "signUp.html"
let isProfilePage = pageName === "userProfile.html"

if (isAuth)
{
    document.querySelector("#sign-in-link").style.display = "none";
    document.querySelector("#sign-up-link").style.display = "none";
}
else
{
    document.querySelector("#profile-link").style.display = "none";
}

if (!isAuth && isProfilePage)
{
    window.location.href = "../index.html";
}

if (isAuth && isAuthPage)
{
    window.location.href = "../index.html";
}

export default class CustomerController
{
    constructor(container)
    {
        this.customerView = container.GetInstance("customerView");
        this.customerModel = container.GetInstance("customerModel");

        this.customerModel.onChangeCallback = (e) => this._onChangeCallback(e);

        this.customerView.controllerOnAddItem = this._signUp;
        this.customerView.controllerOnAuth = this._signIn;
        this.customerView.controllerOnLogout = this._logout;

        document.querySelector('#submit-sign-up')?.addEventListener('click', (e) => this.customerView.OnAddItem(e));
        document.querySelector('#submit-sign-in')?.addEventListener('click', (e) => this.customerView.OnAuth(e));
        document.querySelector('#submit-logout')?.addEventListener('click', (e) => this.customerView.OnLogout(e));

        this._onChangeCallback();
    }

    _onChangeCallback()
    {
        let userData = document.querySelector('#user-data');
        if (userData)
        {
            userData.innerHTML = this.customerView.ToHtml();
        }
    }

    _signUp(gptName, gptFamily, token, privateKey, repeatKey)
    {
        console.log("signUp: ", gptName, gptFamily, token, privateKey, repeatKey);
        const customer = new Customer(gptName, gptFamily, token, privateKey, repeatKey);

        const validationErrors = customer.Validate();
        if (validationErrors.length)
        {
            ExceptionHandleService.ShowUiException(`Validation errors: ${validationErrors.join(', ')}`);
            return false;
        }

        this.customerModel.Append(customer);
        this.customerModel.SaveCurrentUser(customer);
        window.location.href = "../index.html";
        return true;
    }
    _signIn(token, privateKey)
    {
        const customer = this.customerModel.Find(token, "token");
        if (!customer)
        {
            ExceptionHandleService.ShowUiException("Invalid personal token")
            return
        }

        if (!customer || customer.privateKey != privateKey )
        {
            ExceptionHandleService.ShowUiException("Invalid personal private key")
            return
        }

        this.customerModel.SaveCurrentUser(customer);

        console.log("Authenticated");
        window.location.href = "../index.html";
    }

    _logout()
    {
        this.customerModel.ClearCache();
        window.location.href = "../index.html";
    }

    Run()
    {
        let userData = document.querySelector('#user-data');

        if (!userData)
        {
            return;
        }

        let handler =
            {
            set: (obj, prop, val) =>
            {
                obj[prop] = val;
                userData.innerHTML = this.customerView.ToHtml();
                return true;
            }
        }

        this.customerModel.users = new Proxy(this.customerModel.customers, handler);
    }
}
