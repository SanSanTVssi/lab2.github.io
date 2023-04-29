export class CookieService
{
    constructor(cookieName)
    {
        this.cookieName = cookieName;
        this.expiresYear = new Date().getFullYear()+10;
    }

    AppendData(data)
    {
        // const existingCookie = this.GetData();
        // if (existingCookie)
        // {
        //     this.RemoveData();
        // }
        document.cookie = this.cookieName + "=" + JSON.stringify(data) + `; expires=Fri, 31 Dec ${this.expiresYear} 23:59:59 GMT; path=/;`;
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