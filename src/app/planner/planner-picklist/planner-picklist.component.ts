import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { PlannerModuleService } from '../planner-picklist.service';
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss'],

})

export class PlannerPicklistComponent implements OnInit {
    plannerModules: PlannerModule[];
    selectedModules: PlannerModule[];

    constructor(private plannerModuleService: PlannerModuleService) { }

    ngOnInit(): void {
        this.plannerModuleService.selectedModules.subscribe(
            result => {
                this.selectedModules = result;
                this.selectedModules.map(mod => this.checkPrerequisites(mod));
            });

        this.plannerModuleService.plannerModules.subscribe(
            result =>this.plannerModules = result.filter(x =>
            !this.selectedModules.some(y => x.code==y.code)));
    }
    toSource(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules, ["code"]));
        this.toTarget();
    }
    toTarget(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules, ["code"]));
        this.plannerModules.forEach(mod => {
            mod.missing = [];
        });
        this.selectedModules.forEach(mod => {
            this.checkPrerequisites(mod);
        });
    }
    missingMods: String[];
    checkPrerequisites(mod){
        let selectedCodes = this.selectedModules.map(a => a.code);
        let prerequisiteCodes = mod.prerequisites.map(x => x.name);
        mod.missing = prerequisiteCodes.filter(x => !selectedCodes.includes(x));
        console.log(mod.missing);
        console.log("-----");
    }
    openlink(){
        console.log("clickme");
    }
}
