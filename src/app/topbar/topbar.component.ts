import {Component} from '@angular/core';
import {AppMainComponent} from '../app.main.component';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from "../auth/auth.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {
    items: MenuItem[];

    constructor(
        public appMain: AppMainComponent,
        private confirmationService: ConfirmationService,
        public authService: AuthService
    ) {
    }
    logout() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to sign out?',
            accept: () => {
                this.authService.logout();
            }
        });

    }

}
