import {Component} from '@angular/core';
import {AppMainComponent} from '../app.main.component';
import {ConfirmationService, MenuItem} from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html'
})
export class TopbarComponent {

    items: MenuItem[];

    constructor(
        public appMain: AppMainComponent,
        private confirmationService: ConfirmationService) {
    }
    logout() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to sign out?',
            accept: () => {
                //Actual logic to perform a confirmation
            }
        });

    }

}
