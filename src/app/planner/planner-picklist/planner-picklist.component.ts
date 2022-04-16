import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { PlannerModuleService } from '../planner-picklist.service';
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { PlanData } from 'src/app/interaction/modules/planData.model';

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss'],
})

export class PlannerPicklistComponent implements OnInit {
    plannerModules: PlannerModule[];
    selectedModules: PlannerModule[];
    selectedSemester1: boolean;
    selectedSemester2: boolean;
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
                this.filterSemesters();
            });
        this.plannerModuleService.plannerModules
            .subscribe(result => this.plannerModules = result.filter(x => {
                !this.selectedModules.some(y => x.code==y.code);
                this.filterSemesters();
            }));
    }

    filterSemesters(){
        this.selectedSemester1=(this.selectedModules.filter(x => x.semester==1).length>0)
        this.selectedSemester2=(this.selectedModules.filter(x => x.semester==2).length>0)
    }

    toSource(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules, ["code"]));
        this.filterSemesters();
        this.toTarget();
    }

    toTarget(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules, ["code"]));
        this.filterSemesters();
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
    showSemester(module){
        return !(this.selectedModules.map(a => a.code).includes(module))
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
        console.log(inputCode)
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
        localStorage.setItem('takenPrerequisiteStorage', JSON.stringify(this.takenPrerequisites));
    }
    onChange($event){
        localStorage.setItem('takenPrerequisiteStorage', JSON.stringify(this.takenPrerequisites));
    }

    displaySaveForm: boolean = false;
    displayLoadForm: boolean = false;
    output: JSON;
    obj: any;

    savePlan() {
        this.displaySaveForm = true;
        this.obj =
        {
        "modules":this.selectedModules.map(x => x['code']),
        "prerequisites":this.takenPrerequisites
        };
        this.output = <JSON>this.obj;
    }

    returnData: PlanData;


    public paramGroupSelected: QueryParamGroup;

    loadPlan() {
        this.displayLoadForm = true;
        this.plannerModuleService.getPlan().subscribe(response => {
            this.plannerModuleService.returnPlan.next(response.result);
        });
        this.plannerModules = this.plannerModules.concat(this.selectedModules);
        this.selectedModules = [];
        this.filterSemesters();
        this.plannerModuleService.returnPlan
            .subscribe(result => {
                this.returnData = result;
                result.modules.forEach(code => {
                    this.addModule(code)
                });
                this.takenPrerequisites=result.prerequisites;
            });
    }
}
