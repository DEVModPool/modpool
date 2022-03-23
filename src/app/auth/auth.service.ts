import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject, tap} from "rxjs";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Message} from "primeng/api";
import {AuthUtil} from "../util/auth.util";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    private autoLogoutTimer;
    autoLogoutMessage: Message[] = [];

    loginModalDisplayed = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtHelper: JwtHelperService
    ) {}

    ngOnInit() {
    }

    login(user: LoginRequest) {
        return this.http.post<any>('https://localhost:5001/api/login', user).pipe(
            tap(response => {
                localStorage.setItem("user", response.email)
                this.setAutoLogout(response.token);
            })
        )
    }

    logout() {
        this.removeJwtToken();
        this.router.navigate(['/login']);
        if(this.autoLogoutTimer) {
            clearTimeout(this.autoLogoutTimer);
        }
    }

    removeJwtToken() {
        localStorage.removeItem("jwt");
    }

    setJwtToken(token) {
        localStorage.setItem("jwt", token);
    }

    setAutoLogout(token: string) {
        this.autoLogoutTimer = setTimeout(() => {
            this.autoLogoutMessage = [{
                severity: 'warn',
                summary: 'Session Expired!',
                detail: 'Please log in again.'
            }];
            this.logout();
        }, this.timeUntilJwtExpiration(token))
    }

    timeUntilJwtExpiration(token: string) {
        const tokenExpirationTimestamp = this.jwtHelper.getTokenExpirationDate(token).getTime();
        const currentTimeTimestamp = new Date().getTime();
        console.log(tokenExpirationTimestamp - currentTimeTimestamp);
        return tokenExpirationTimestamp - currentTimeTimestamp;
    }

    isLoggedIn() {

        const token = AuthUtil.tokenGetter();
        return (token && !this.jwtHelper.isTokenExpired(token));
    }
}

export interface LoginRequest {
    email: string;
    password: string;
}
