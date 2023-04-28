export class Post {
    constructor(image, title, description, author) {
        this.id = Math.round(Math.random() * 100000).toString();
        this.image = image;
        this.title = title;
        this.description = description;
        this.author = author;
        this.postDate = getDate();

        if (!this.validate()) {
            alert("Error: invalid post")
            return
        }

        this.onChangeCallback = null;
        return this.initOnModelChange();
    }

    validate() {
        let tmp = {
            title: !!this.title,
            description: !!this.description,
            author: !!this.author,
        }

        return Object.values(tmp).every(value => value === true)
    }


    setOnChangeCallback(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                if (this.onChangeCallback) this.onChangeCallback(this);
                return true;
            }
        }
        return new Proxy(this, handler);
    }
}

function getDate() {
    return new Date().toLocaleString('en-GB', {
        hour12: false,
    });
}
