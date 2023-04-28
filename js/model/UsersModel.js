export default class UsersModel {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem("userData"))
        this.users = JSON.parse(localStorage.getItem("users")) || []
        this.onChangeCallback = null;
    }

    find(email, password) {
        for (const user of this.users) {
            if (user.email === email && user.password === password) {
                this.currentUser = user
                this.saveUserData()
                return true
            }
        }

        return false
    }

    add(user) {
        user.onChangeCallback = this.onChangeCallback;
        this.users.push(user);
        this.save();
    }

    logout() {
        this.currentUser = null
        localStorage.removeItem("userData")

        return false
    }

    delete(postId) {
        const postIndex = this.users.findIndex(item => item.id === postId);
        this.users.splice(postIndex, 1);
        this.save();
    }

    saveUserData() {
        localStorage.setItem("userData", JSON.stringify(this.currentUser))
    }

    save() {
        localStorage.setItem("users", JSON.stringify(this.users))
    }

    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}
