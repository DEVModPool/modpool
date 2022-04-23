import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination.component";
import { PaginatorModule } from "primeng/paginator";

@NgModule({
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ],
    imports: [
        PaginatorModule
    ]
})
export class PaginationModule {

}
