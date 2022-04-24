import { Component, OnInit } from '@angular/core';
import { ModulesService } from "../modules.service";
import { ModuleItem } from "./module-item/module-item.model";
import { SubscriptionHandler } from "../../interaction/subscription-handler";
import { ActivatedRoute } from "@angular/router";
import { PlannerModuleService } from 'src/app/planner/planner-picklist.service';
import { PlanNames } from 'src/app/interaction/modules/planData.model';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-module-list',
    templateUrl: './module-list.component.html'
})
export class ModuleListComponent extends SubscriptionHandler implements OnInit {
    modules: ModuleItem[];
    planSubject: Subject<PlanNames[]>;
    constructor(
        private activatedRoute: ActivatedRoute,
        private moduleService: ModulesService,
        private plannerModuleService: PlannerModuleService
    ) {
        super();
    }

    ngOnInit(): void {
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

        this.plannerModuleService.getNames().subscribe(response => {
            this.plannerModuleService.returnNames.next(response.result.modulePlanners);
        });
        this.planSubject = this.plannerModuleService.returnNames;
    }

}
