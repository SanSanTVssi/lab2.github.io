import UserView from "./UserView.js";

export default class UsersView {
    constructor(usersModel) {
        this.usersModel = usersModel;

        this.controllerOnAddItem = null;
        this.controllerOnAuth = null;
        this.controllerOnLogout = null;
    }

    setControllerOnAddItem(controllerOnAddItem) {
        this.controllerOnAddItem = controllerOnAddItem;
    }

    setControllerOnAuth(controllerOnAuth) {
        this.controllerOnAuth = controllerOnAuth;
    }

    setControllerOnLogout(controllerOnLogout) {
        this.controllerOnLogout = controllerOnLogout;
    }

    onAddItem(e) {
        e.preventDefault()

        const signUp = document.querySelector('#sign-up')

        const firstName = signUp["first_name"]?.value
        const lastName = signUp["last_name"]?.value
        const email = signUp["email"]?.value
        const password = signUp["password"]?.value
        const repeatPassword = signUp["repeat_password"]?.value
        const group = signUp["group"]?.value

        this.controllerOnAddItem(firstName, lastName, email, group, password, repeatPassword);
    }

    onAuth(e) {
        e.preventDefault()

        const signIn = document.querySelector('#sign-in')

        const email = signIn["email"]?.value
        const password = signIn["password"]?.value

        this.controllerOnAuth(email, password)
    }

    onLogout(e) {
        e.preventDefault()

        this.controllerOnLogout()
    }

    toHtml() {
        const user = new UserView(this.usersModel.currentUser);

        return user.toHtml();
    }
}
