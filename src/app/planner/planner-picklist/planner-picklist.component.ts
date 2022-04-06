import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { PlannerModuleService } from '../planner-picklist.service';
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';
import {MenuItem} from 'primeng/api';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { resourceUsage } from 'process';

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss'],
})

export class PlannerPicklistComponent implements OnInit {
    plannerModules: PlannerModule[];
    selectedModules: PlannerModule[];
    takenPrerequisites: string[];
    allPrerequisites: any[];
    public paramModuleCode: QueryParamGroup;
    checked1: boolean = true;
    constructor(private plannerModuleService: PlannerModuleService, qpb: QueryParamBuilder) {
        this.paramModuleCode = qpb.group({
            code: qpb.stringParam('code', {multi:true})
        })
     }

    ngOnInit(): void {
        console.log(JSON.parse(localStorage.getItem('takenPrerequisiteStorage')));
        this.plannerModules = [];
        this.selectedModules = [];
        this.takenPrerequisites = (JSON.parse(localStorage.getItem('takenPrerequisiteStorage'))==null ? [] : JSON.parse(localStorage.getItem('takenPrerequisiteStorage')));
        this.allPrerequisites = [];

        this.plannerModuleService.selectedModules.subscribe(
            result => {
                this.selectedModules = result;
                this.selectedModules.map(mod => this.checkPrerequisites(mod));
                result.map(x => x.prerequisites).forEach(element => {
                    element.forEach(
                        x => {
                            if (!this.allPrerequisites.includes(x["code"])){this.allPrerequisites.push(x["code"])}
                    });
                });
                this.allPrerequisites = this.allPrerequisites.sort();
            });
        this.plannerModuleService.plannerModules
            .subscribe(result => this.plannerModules = result.filter(x => !this.selectedModules.some(y => x.code==y.code)));

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
        this.allPrerequisites = [];
        this.selectedModules.forEach(mod => {
            this.checkPrerequisites(mod);
        });
        this.allPrerequisites = this.allPrerequisites.sort();
        this.selectedModules = this.selectedModules.slice();
    }
    missingMods: String[];

    checkPrerequisites(mod){
        let selectedCodes = this.selectedModules.map(a => a.code);
        let prerequisiteCodes = mod.prerequisites.map(a => a.code);
        mod.missing = prerequisiteCodes.filter(x => !selectedCodes.includes(x));
        prerequisiteCodes.forEach(preReq => {
            if (!this.allPrerequisites.includes(preReq)){this.allPrerequisites.push(preReq)}
        });
    }

    highlightPrerequisite(prereq){
        return (this.selectedModules.map(a => a.code).includes(prereq) || this.takenPrerequisites.includes(prereq));
    }
    showButton(code){
        return this.selectedModules.map(a => a.code).includes(code);
    }
    highlightAccordionMessage(missingList){
        let selectedCodes = this.selectedModules.map(y => y.code);
        let selectedPrereqs = this.takenPrerequisites;
        missingList = missingList.filter(x => !selectedCodes.includes(x));
        missingList = missingList.filter(x => !selectedPrereqs.includes(x));
        missingList = missingList.filter(x => x!='');
        return (missingList.length);
    }

    addModule(inputCode){
        this.paramModuleCode.setValue({'code':inputCode});
        this.plannerModuleService.getModule(this.paramModuleCode.value)
        .subscribe(response => {
            this.plannerModuleService.requestedModule.next(response.result);
        });
        this.plannerModuleService.requestedModule
        .subscribe(result => {
            if(!this.selectedModules.map(x => x.code).includes(result[0].code)){
            this.selectedModules.push(result[0]);
            }
            this.plannerModules = this.plannerModules.filter(x => !this.selectedModules.some(y => x.code==y.code));
            this.toTarget();
        });
    }
    disableAddtoPrereq(code){
        return this.selectedModules.map(x => x.code).includes(code) || this.selectedModules.includes(code);
    }
    addPrequisite(code){
        if (this.takenPrerequisites.includes(code)){
            this.takenPrerequisites = this.takenPrerequisites.filter(x => x!=code);
        } else {
            this.takenPrerequisites.push(code)
        }
        this.takenPrerequisites = this.takenPrerequisites.slice();
    }
    onChange($event){
        localStorage.setItem('takenPrerequisiteStorage', JSON.stringify(this.takenPrerequisites));
        console.log(JSON.parse(localStorage.getItem('takenPrerequisiteStorage')));
}
}
