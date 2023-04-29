export class LocalStorageService
{
    constructor(key)
    {
        this.key = key;
    }
    AppendData(data)
    {
        localStorage.setItem(this.key, data)
    }

    GetData()
    {
        return localStorage.getItem(this.key)
    }

    RemoveData()
    {
        localStorage.removeItem(this.key);
    }
}