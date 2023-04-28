import {User} from "../model/User.js";

const isAuth = !!localStorage.getItem("userData")


let pageName = location.href.split("/").slice(-1).join();
let isAuthPage = pageName === "signIn.html" || pageName === "signUp.html"
let isProfilePage = pageName === "userProfile.html"

if (isAuth) {
    document.querySelector("#sign-in-link").style.display = "none";
    document.querySelector("#sign-up-link").style.display = "none";
} else {
    document.querySelector("#profile-link").style.display = "none";
}

// redirecting
if (!isAuth && isProfilePage) {
    window.location.href = "../index.html";
}

if (isAuth && isAuthPage) {
    window.location.href = "../index.html";
}

export default class UserController {
    constructor(usersModel, usersView) {
        this.usersModel = usersModel;
        this.usersView = usersView;

        this.usersModel.setOnChangeCallback((e) => this.onChangeCallback(e));

        this.usersView.setControllerOnAddItem(this.signUp);
        this.usersView.setControllerOnAuth(this.signIn);
        this.usersView.setControllerOnLogout(this.logout);

        document.querySelector('#submit-sign-up')?.addEventListener('click', (e) => usersView.onAddItem(e));
        document.querySelector('#submit-sign-in')?.addEventListener('click', (e) => usersView.onAuth(e));
        document.querySelector('#submit-logout')?.addEventListener('click', (e) => usersView.onLogout(e));

        this.onChangeCallback();
    }

    onChangeCallback() {
        let userData = document.querySelector('#user-data')
        if (userData) {
            userData.innerHTML = this.usersView.toHtml();
        }
    }

    signUp(firstName, lastName, email, group, password, repeatPassword) {
        const user = new User(firstName, lastName, email, group, password, repeatPassword);
        this.usersModel.add(user);
        window.location.href = "signIn.html";
    }

    signIn(email, password) {
        if (!this.usersModel.find(email, password)) {
            alert("Invalid credentials")
            return
        }

        console.log("User is authenticated")
        window.location.href = "../index.html";
    }

    logout() {
        this.usersModel.logout()
        window.location.href = "../index.html";
    }

    initOnModelChange() {
        let userData = document.querySelector('#user-data')

        if (!userData) return

        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                userData.innerHTML = this.usersView.toHtml();
                return true;
            }
        }

        this.usersModel.users = new Proxy(this.usersModel.users, handler);
    }
}
