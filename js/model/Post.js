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

        const validationErrors = this._validate();
        if (validationErrors.length)
        {
            throw new Error(`Error creating post due the errors: ${validationErrors}`);
        }

        this.onChangeCallback = null;
        return this.initOnModelChange();
    }

    _validate()
    {
        const validationErrors = [];

        if (!this.title)
        {
            validationErrors.push('Title is required');
        }

        if (!this.description)
        {
            validationErrors.push('Description is required');
        }

        if (!this.author)
        {
            validationErrors.push('Author is required');
        }

        return validationErrors;
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
