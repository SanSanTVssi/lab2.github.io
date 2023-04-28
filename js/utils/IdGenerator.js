export class IdGenerator
{
    static LocalStorageIdKey = `LastUsedId`;
    static GetUniqueId()
    {
        let lastUsedId = localStorage.getItem(IdGenerator.LocalStorageIdKey);
        if (!lastUsedId)
        {
            lastUsedId = 0;
        }
        else
        {
            lastUsedId ++;
        }

        localStorage.setItem(IdGenerator.LocalStorageIdKey, lastUsedId);
        return lastUsedId;
    }
}