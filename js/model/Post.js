import {IdGenerator} from "../utils/IdGenerator.js";

export class Post {
    constructor(image, title, description, author, body)
    {
        this.id = IdGenerator.GetUniqueId();
        this.image = image;
        this.title = title;
        this.description = description;
        this.author = author;
        this.postDate = getDate();
        this.body = body;

        if (!this._validate())
        {
            alert("Error: invalid post")
            return
        }

        this.onChangeCallback = null;
        return this.initOnModelChange();
    }

    _validate()
    {
        let tmp =
            {
            title: !!this.title,
            description: !!this.description,
            author: !!this.author,
        }

        return Object.values(tmp).every(value => value === true)
    }

    initOnModelChange()
    {
        let handler =
            {
            set: (obj, prop, val) =>
            {
                obj[prop] = val;
                if (this.onChangeCallback) this.onChangeCallback(this);
                return true;
            }
        }
        return new Proxy(this, handler);
    }
}

function getDate()
{
    return new Date().toLocaleString('en-GB',
        {
        hour12: false,
        });
}
