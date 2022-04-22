import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigComponent } from './config/config.component';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';

import { ConfigService } from './config/config.service';
import { MenuService } from "./menu/menu.service";
import { RippleModule } from "primeng/ripple";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MenuComponent } from "./menu/menu.component";
import { AuthModule } from "./auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PlannerModule } from "./planner/planner.module";
import { QueryParamModule } from "@ngqp/core";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthUtil } from "./util/auth.util";
import { StaffModule } from "./staff/staff.module";
import { RegisterComponent } from './auth/register/register.component';
import { environment } from "../environments/environment";
import { ToastModule } from "primeng/toast";
import { ModulesModule } from "./modules/modules.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {SpinnerInterceptor} from "./interaction/spinner.interceptor";
import {ServerErrorComponent} from "./error-pages/server-error/server-error.component";
import {NotFoundComponent} from "./error-pages/not-found/not-found.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        AppRoutingModule,
        ConfirmDialogModule,
        RippleModule,
        BrowserAnimationsModule,
        PlannerModule,
        StaffModule,
        QueryParamModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: AuthUtil.tokenGetter,
                allowedDomains: [environment.jwtAllowedDomain],
                disallowedRoutes: []
            }
        }),
        ToastModule,
        ModulesModule,
        NgxSpinnerModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
        AppMainComponent,
        TopbarComponent,
        FooterComponent,
        ConfigComponent,
        MenuComponent,
        MenuItemComponent,
        ServerErrorComponent,
        NotFoundComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
        ConfigService,
        MenuService,
        ConfirmationService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
