export default class CustomerView {
    constructor(container)
    {
        this.customerModel = container.GetInstance("customerModel");

        this.controllerOnAddItem = null;
        this.controllerOnAuth = null;
        this.controllerOnLogout = null;
    }

    OnAddItem(e)
    {
        e.preventDefault()

        const signUp = document.querySelector('#sign-up');

        const gpt_name = signUp["gpt_name"]?.value
        const gpt_family = signUp["gpt_family"]?.value
        const personal_token = signUp["personal_token"]?.value
        const private_key = signUp["private_key"]?.value
        const repeat_private_key = signUp["repeat_private_key"]?.value

        this.controllerOnAddItem(gpt_name, gpt_family, personal_token, private_key, repeat_private_key);
    }

    OnAuth(e)
    {
        e.preventDefault()
        const signIn = document.querySelector('#sign-in')
        this.controllerOnAuth(signIn["personal_token"]?.value, signIn["private_key"]?.value)
    }

    OnLogout(e)
    {
        e.preventDefault()

        this.controllerOnLogout()
    }

    ToHtml()
    {
        const customerModel = this.customerModel.currentCustomer;
        return `
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Gpt Name:</th>
                        <td>${customerModel.gptName}</td>
                    </tr>
                    <tr>
                        <th>Gpt Family:</th>
                        <td>${customerModel.gptFamily}</td>
                    </tr>
                    <tr>
                        <th>Personal token:</th>
                        <td>${customerModel.token}</td>
                    </tr>
                </tbody>
            </table>           
        `;
    }
}
