import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Message } from "primeng/api";
import { AuthUtil } from "../util/auth.util";
import { environment } from "../../environments/environment";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private autoLogoutTimer;
    autoLogoutMessage: Message[] = [];

    loginModalDisplayed = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtHelper: JwtHelperService
    ) {
    }

    getUserId(decodedObj): string {
        const regex = /\/name$/;
        for (let key of Object.keys(decodedObj)) {
            if (regex.test(key)) {
                return decodedObj[key];
            }
        }
        return null;
    }

    authenticateUser(response) {
        const token = response.result.token;
        const decoded = this.jwtHelper.decodeToken(token);
        const userId = this.getUserId(decoded);

        localStorage.setItem(environment["jwt-key"], token)
        localStorage.setItem("userId", userId);
        localStorage.setItem("user", response.result.user.emailAddress);
        this.setAutoLogout(response.result.token);
    }

    login(user: LoginRequest) {
        return this.http.post<any>(environment.baseUrl + 'login/', user)
            .pipe(
                tap(response => {
                    this.authenticateUser(response);
                })
            ).pipe(
                catchError(error => {
                    console.log(error);
                    return throwError(error);
                })
            )
    }

    register(user: LoginRequest) {
        return this.http.post<any>(environment.baseUrl + 'register/', user)
            .pipe(
                catchError(error => {
                    console.log(error);
                    return throwError(error);
                })
            )
            .subscribe(
                _ => {
                    this.router.navigate(['/confirmEmail'])
                }
            );
    }

    logout() {
        this.clearLocalStorage();
        if (this.autoLogoutTimer) {
            clearTimeout(this.autoLogoutTimer);
        }
        this.router.navigate(['/']);
    }

    submitToken(token) {
        return this.http.post<any>(environment.baseUrl + 'activate-user', {token})
            .pipe(
                catchError(error => {
                    console.log(error);
                    return throwError(error);
                })
            )
            .subscribe(
                response => {
                    console.log(response);
                    this.authenticateUser(response);
                    // this.router.navigate(['/']);
                }
            )
    }

    clearLocalStorage() {
        localStorage.removeItem(environment["jwt-key"]);
        localStorage.removeItem(environment["userId-key"]);
        localStorage.removeItem(environment["user-key"]);
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
        return tokenExpirationTimestamp - currentTimeTimestamp;
    }

    requireLogIn(callback) {
        if (!this.isLoggedIn()) {
            this.loginModalDisplayed.next(true);
            return;
        }
        callback();
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
