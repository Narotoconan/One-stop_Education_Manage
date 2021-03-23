import jwtDecode from "jwt-decode";
export default {
    getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    delCookie(name){
        document.cookie = name +"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    checkLogin() {
        let token = this.getCookie('access_token')
        if (!token) return 0
        token = jwtDecode(token)
        if(token.scopes[1] !== 'ADMIN') return 0
        let expTime = token.exp //过期时间
        let nowTime = Math.round(new Date() / 1000);//现在时间
        return (nowTime < expTime) ? 1 : 0
    },
    getAdminId(){
        let token = this.getCookie('access_token')
        token = jwtDecode(token)
        return token.uid
    }

}
