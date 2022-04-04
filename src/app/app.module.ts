import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { StaffFilterComponent } from './staff/staff-filter/staff-filter.component';
import { StaffDetailsComponent } from './staff/staff-details/staff-details.component';
import { ReviewItemComponent } from './reviews/review-item/review-item.component';
import { ReviewsModule } from "./reviews/reviews.module";

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
        ReviewsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: AuthUtil.tokenGetter,
                allowedDomains: ["localhost:5001"],
                disallowedRoutes: []
            }
        })
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        TopbarComponent,
        FooterComponent,
        ConfigComponent,
        MenuComponent,
        MenuItemComponent,
    ],
    providers: [
        ConfigService,
        MenuService,
        ConfirmationService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
