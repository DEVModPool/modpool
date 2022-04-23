import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthUtil} from "../util/auth.util";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate() {
        if(!this.authService.isLoggedIn()) {
            return true;
        }

        this.router.navigate(["/"]);
        return false;
    }
}
