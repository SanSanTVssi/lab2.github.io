export default class UserView {
    constructor(userModel) {
        this.userModel = userModel;
    }

    toHtml() {
        return `
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Gpt Name:</th>
                        <td>${this.userModel.firstName}</td>
                    </tr>
                    <tr>
                        <th>Gpt Family:</th>
                        <td>${this.userModel.lastName}</td>
                    </tr>
                    <tr>
                        <th>Personal token:</th>
                        <td>${this.userModel.email}</td>
                    </tr>
                </tbody>
            </table>           
        `;
    }
}
