export class LocalStorageService
{
    constructor(key)
    {
        this.key = key;
    }
    AppendData = (data) => localStorage.setItem(this.key, data);
    GetData = () => localStorage.getItem(this.key);
    RemoveData = () => localStorage.removeItem(this.key);
}