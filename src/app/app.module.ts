import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {TopbarComponent} from './topbar/topbar.component';
import {FooterComponent} from './footer/footer.component';
import {ConfigComponent} from './config/config.component';
import {MenuItemComponent} from './menu/menu-item/menu-item.component';

import {ConfigService} from './config/config.service';
import {MenuService} from "./menu/menu.service";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MenuComponent} from "./menu/menu.component";
import {AuthModule} from "./auth/auth.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlannerModule} from "./planner/planner.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        AppRoutingModule,
        ConfirmDialogModule,
        RippleModule,
        BrowserAnimationsModule,
        PlannerModule
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        TopbarComponent,
        FooterComponent,
        ConfigComponent,
        MenuComponent,
        MenuItemComponent
    ],
    providers: [
        // {provide: LocationStrategy, useClass: HashLocationStrategy},
        ConfigService,
        MenuService,
        ConfirmationService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
