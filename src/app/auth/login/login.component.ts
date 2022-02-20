import { Component } from '@angular/core';
import { ConfigService } from '../../config/config.service';
import { Config } from '../../config/config';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [`./login.component.scss`]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password: string;

    config: Config;

    subscription: Subscription;

    constructor(public configService: ConfigService){ }

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
    }

    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }
}
