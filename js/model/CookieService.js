export class CookieService
{
    constructor(cookieName)
    {
        this.cookieName = cookieName;
        this.expiresYear = new Date().getFullYear()+10;
    }

    AppendData(data)
    {
        const existingCookie = this.GetData();
        if (existingCookie)
        {
            this.RemoveData();
        }
        console.log(JSON.stringify(data));
        const cookieStr = this.cookieName + "=" + JSON.stringify(data) + "; expires=Fri, 31 Dec 2033 23:59:59 GMT; path=/;"
        console.log(cookieStr)
        document.cookie = cookieStr;
    }

    GetData()
    {
        const cookies = document.cookie.split(";").map((cookieString) => cookieString.trim());
        const matchingCookie = cookies.find((cookie) => cookie.startsWith(`${this.cookieName}=`));
        if (matchingCookie)
        {
            return matchingCookie.substring(this.cookieName.length + 1);
        }
        return null;
    }

    RemoveData = ()=> document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}