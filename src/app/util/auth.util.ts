export class AuthUtil {
    static tokenGetter() {
        return localStorage.getItem("jwt");
    }
}
