import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
    displayModal = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.loginModalDisplayed.subscribe(
            displayed => {
                this.displayModal = displayed;
            }
        )
    }

    closeModal() {
        this.authService.loginModalDisplayed.next(false);
    }
}
