import {ExceptionHandleService} from "../ExceptionHandleService.js"
export default class CustomerModel {
    constructor(container)
    {
        this.customersService = container.GetInstance("customersService");
        this.currentCustomerService = container.GetInstance("customerService");
        try
        {
            this.currentCustomer = JSON.parse(this.currentCustomerService.GetData());
            this.customers = JSON.parse(this.customersService.GetData()) || [];
        }
        catch (exception)
        {
            console.log(exception);
        }
        this.onChangeCallback = null;
    }

    Find(value, propertyName)
    {
        try
        {
            for (const customer of this.customers)
            {
                if (!customer.hasOwnProperty(propertyName))
                {
                   break;
                }
                if (customer[propertyName] == value)
                {
                    return customer;
                }
            }
        }
        catch (exception)
        {
            ExceptionHandleService.ShowUiException("CustomerModel.find failed due exception" + exception);
        }
        return null;
    }

    Append(customer)
    {
        // Do not show customer data because we do not want to show privateKey (password)
        console.log("Append()");
        customer.onChangeCallback = this.onChangeCallback;

        try
        {
            this.customers.push(customer);
            this._save();
        }
        catch (exception)
        {
            ExceptionHandleService.ShowUiException("CustomerModel.Append failed due exception" + exception);
            return false;
        }
        return true;
    }

    ClearCache()
    {
        console.log("ClearCache()");
        try
        {
            this.currentCustomer = null;
            this.currentCustomerService.RemoveData();
        }
        catch (exception)
        {
            ExceptionHandleService.ShowUiException("CustomerModel.ClearCache failed due exception" + exception);
            return false;
        }
        return true;
    }

    Remove(postId)
    {
        console.log("Remove(" + postId + ")");
        try
        {
            this.customers.splice(this.customers.findIndex(item => item.id === postId), 1);
            this._save();
            return false;
        }
        catch (exception)
        {
            ExceptionHandleService.ShowUiException("CustomerModel.Remove failed due exception" + exception);
        }
        return true;
    }

    SaveCurrentUser(customer)
    {
        // Do not show customer data because we do not want to show privateKey (password)
        console.log("SaveCurrentUser(customer)");
        try
        {
            this.currentCustomerService.AppendData(JSON.stringify(customer))
        }
        catch (exception)
        {
            ExceptionHandleService.ShowUiException("CustomerModel.SaveCurrentUser failed due exception" + exception);
            return false;
        }
        this.currentCustomer = customer;
        return true;
    }

    _save()
    {
        console.log("_save");
        try
        {
            this.customersService.AppendData(JSON.stringify(this.customers));
        }
        catch (exception)
        {
            ExceptionHandleService.ShowUiException("CustomerModel._save failed due exception" + exception);
        }
    }
}

export class Customer
{
    constructor(gptName, gptFamily, token, privateKey, repeatKey)
    {
        this.id = Math.round(Math.random() * 100000).toString();
        this.gptName = gptName;
        this.gptFamily = gptFamily;
        this.token = token;
        this.privateKey = privateKey;
        this.repeatKey = repeatKey;
    }

    Validate()
    {
        const validationErrors = [];

        if (!this.gptName)
        {
            validationErrors.push('Gpt name is required');
        }

        if (!this.gptFamily)
        {
            validationErrors.push('Gpt family is required');
        }

        if (!this.token)
        {
            validationErrors.push('Personal Token is required');
        }

        if (this.repeatKey !== this.privateKey)
        {
            validationErrors.push('Private key do not match');
        }

        if (this.repeatKey?.length < 4)
        {
            validationErrors.push('Private key must be at least 4 characters long');
        }

        return validationErrors;
    }
}