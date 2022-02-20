import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Config } from './config';

@Injectable()
export class ConfigService {

    config: Config = {
        theme: 'lara-light-indigo',
        dark: false,
        inputStyle: 'outlined',
        ripple: true
    };

    private configUpdate = new Subject<Config>();

    configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: Config) {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig() {
        return this.config;
    }
}
