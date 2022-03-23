import { AuthService } from "../../auth/auth.service";
import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class LoginModalInterface implements OnInit {

    displayModal: boolean;

    constructor(protected authService: AuthService) {
    }

    ngOnInit() {
        this.authService.loginModalDisplayed.subscribe(
            displayed => {
                this.displayModal = displayed;
            }
        )
    }

    showModal() {
        this.authService.loginModalDisplayed.next(true);
    }

    checkLogin(actionCallback) {
        if (this.authService.isLoggedIn()) {
            actionCallback();
        } else {
            this.showModal();
        }
    }
}
