import { Component, OnInit } from '@angular/core';
import { ModulesService } from "../modules.service";
import { ModuleItem } from "./module-item/module-item.model";
import { SubscriptionHandler } from "../../interaction/subscription-handler";
import { ActivatedRoute } from "@angular/router";
import { PlannerModuleService } from 'src/app/planner/planner-picklist.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.component.html'
})
export class ModuleListComponent extends SubscriptionHandler implements OnInit {
    modules: ModuleItem[];
    constructor(
        private activatedRoute: ActivatedRoute,
        private moduleService: ModulesService,
        private plannerModuleService: PlannerModuleService,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        console.log("init")
        this.storeSubscription(
            this.activatedRoute.data.subscribe(
                _ => {
                    this.storeSubscription(
                        this.moduleService.getAll()
                    );
                }
            )
        );

        this.storeSubscription(
            this.moduleService.getObservable.subscribe(
                modules => {
                    this.modules = modules;

                })
        );
        if (this.authService.isLoggedIn()) {
            this.plannerModuleService.getNames().subscribe(response => {
                this.plannerModuleService.returnNames.next(response.result.modulePlanners);
            });
        }
    }
    refresh(event){

        this.plannerModuleService.getNames().subscribe(response => {
            this.plannerModuleService.returnNames.next(response.result.modulePlanners);
        });
    }

}
