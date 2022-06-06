import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Message } from "primeng/api";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
    displayModal = false;
    invalidMessages: Message[];
    loading = false;

    authForm = new FormGroup({
        emailAddress: new FormControl(''),
        password: new FormControl('')
    });

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.loginModalDisplayed.subscribe(
            displayed => {
                this.displayModal = displayed;
            }
        )
        this.invalidMessages = this.authService.autoLogoutMessage;
    }

    login(): any {
        this.loading = true;
        const user = this.authForm.value;
        this.authService.login(user).subscribe({
            next: () => this.closeModal(),
            error: () => {
                this.invalidMessages = [{
                    severity: 'error',
                    summary: 'Login failed!',
                    detail: 'Wrong username or password.'
                }]
            }
        }).add(() => this.loading = false);
    }

    closeModal() {
        this.authService.loginModalDisplayed.next(false);
        this.invalidMessages = []
    }
}
