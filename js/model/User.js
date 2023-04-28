export class User {
    constructor(firstName, lastName, email, nonce, password, repeatPassword) {
        this.id = Math.round(Math.random() * 100000).toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword

        if (!this.validate()) {
            alert("Error: invalid user data")
        }
    }

    validate() {
        let tmp = {
            firstName: !!this.firstName,
            lastName: !!this.lastName,
            email: !!this.email,
            password: this.repeatPassword === this.password
        }

        console.log(tmp)

        return Object.values(tmp).every(value => value === true)
    }
}
