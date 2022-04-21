import { Component, OnInit } from '@angular/core';

import { ModulesService } from "../modules.service";
import { ModuleItem } from "./module-item/module-item.model";
import { SubscriptionHandler } from "../../interaction/subscription-handler";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.component.html'
})
export class ModuleListComponent extends SubscriptionHandler implements OnInit {
    modules: ModuleItem[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private moduleService: ModulesService
    ) {
        super();
    }

    ngOnInit(): void {

        this.activatedRoute.data.subscribe(
            response => {
                console.log(response);
                this.modules = response.moduleData.modules.items;
            }
        )

        // this.storeSubscription(
        //     this.moduleService.getObservable.subscribe(
        //         response => {
        //             console.log(response);
        //             // this.modules = response.moduleData;
        //         })
        // );
    }
}
