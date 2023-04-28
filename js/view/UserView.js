export default class UserView {
    constructor(userModel) {
        this.userModel = userModel;
    }

    toHtml() {
        console.log(this.userModel.gptName);
        console.log(this.userModel.gptFamily);
        console.log(this.userModel.token);
        return `
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Gpt Name:</th>
                        <td>${this.userModel.gptName}</td>
                    </tr>
                    <tr>
                        <th>Gpt Family:</th>
                        <td>${this.userModel.gptFamily}</td>
                    </tr>
                    <tr>
                        <th>Personal token:</th>
                        <td>${this.userModel.token}</td>
                    </tr>
                </tbody>
            </table>           
        `;
    }
}
