import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { PlannerModuleService } from '../planner-picklist.service';
import { PlannerModule } from 'src/app/interaction/modules/planner-module.model';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { PlanData } from 'src/app/interaction/modules/planData.model';
import { PlanNames } from 'src/app/interaction/modules/planData.model';
import { AuthService } from 'src/app/auth/auth.service';
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
    plans: PlanNames[];
    selectedPlan: PlanNames;
    saveText: String;
    public paramModuleID: QueryParamGroup;
    public paramPlanCode: QueryParamGroup;

    constructor(
        private plannerModuleService: PlannerModuleService,
        qpbModules: QueryParamBuilder,
        qpbPlans: QueryParamBuilder,
        private authService: AuthService,
        ) {
        this.paramPlanCode = qpbPlans.group({
            plan: qpbPlans.stringParam('plan', {multi:true})
        })
        this.paramModuleID = qpbModules.group({
            id: qpbModules.stringParam('id', {multi:true})
        })
     }

    ngOnInit(): void {
        this.plannerModules = [];
        this.selectedModules = [];
        this.takenPrerequisites = (JSON.parse(localStorage.getItem('takenPrerequisiteStorage'))==null ? [] : JSON.parse(localStorage.getItem('takenPrerequisiteStorage')));
        this.allPrerequisites = [];
        this.selectedModules = (JSON.parse(localStorage.getItem('selectedModuleStorage')));
        this.selectedModules = (this.selectedModules==null) ? [] : this.selectedModules;
        this.selectedModules.forEach(x => this.checkPrerequisites(x))
        this.filterSemesters()
        this.plannerModuleService.plannerModules
            .subscribe(result => {
                this.plannerModules = result.filter(x => !this.selectedModules.some(y => x.id==y.id))
                this.plannerModules.forEach(x=> x['missing'] = [])

            });
        this.saveText = "";
    }

    filterSemesters(){
        this.selectedSemester1=(this.selectedModules.filter(x => x.semester==1).length>0)
        this.selectedSemester2=(this.selectedModules.filter(x => x.semester==2).length>0)
    }

    toSource(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules));
        this.filterSemesters();
        this.toTarget();
    }

    toTarget(){
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules));
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
        let selectedCodes = this.selectedModules.map(a => a.id);
        mod.missing = mod.prerequisiteModules.map(a => a.id).filter(x => !selectedCodes.includes(x.id));
        mod.prerequisiteModules.forEach(preReq => {
            if (!this.allPrerequisites.includes(preReq)){this.allPrerequisites.push(preReq)}
        });
    }
    showSemester(module){
        return !(this.selectedModules.map(a => a.id).includes(module))
    }
    highlightPrerequisite(prereq){
        return (this.selectedModules.map(a => a.id).includes(prereq) || this.takenPrerequisites.includes(prereq));
    }
    showButton(id){
        return this.selectedModules.map(a => a.id).includes(id);
    }
    highlightAccordionMessage(missingList){
        let selectedCodes = this.selectedModules.map(y => y.id);
        let selectedPrereqs = this.takenPrerequisites;
        missingList = missingList.filter(x => !selectedCodes.includes(x));
        missingList = missingList.filter(x => !selectedPrereqs.includes(x));
        missingList = missingList.filter(x => x!='');
        return (missingList.length);
    }

    addModule(inputCode){
        this.paramModuleID.setValue({'id':inputCode});
        console.log(inputCode)
        this.plannerModuleService.getModule(inputCode)
        .subscribe(response => {
            this.plannerModuleService.requestedModule.next(response.result);
        });
        this.plannerModuleService.requestedModule
        .subscribe(result => {
            console.log(result)
            if(!this.selectedModules.map(x => x.id).includes(result.id)){
            this.selectedModules.push(result);
            }
            this.plannerModules = this.plannerModules.filter(x => !this.selectedModules.some(y => x.id==y.id));
            this.toTarget();
        });
    }

    disableAddtoPrereq(id){
        return this.selectedModules.map(x => x.id).includes(id) || this.selectedModules.includes(id);
    }

    addPrequisite(id){
        if (this.takenPrerequisites.includes(id)){
            this.takenPrerequisites = this.takenPrerequisites.filter(x => x!=id);
        } else {
            this.takenPrerequisites.push(id)
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


    openSaveDialog() {
        this.authService.requireLogIn(() =>
        {
            this.displaySaveForm = true;
        }
        )
    }

    savePlan() {
        this.obj =
            {
                "name": this.saveText ,
                "moduleIDs":this.selectedModules.map(x => x['id']),
                "studentID": localStorage.getItem('userId')
            };
        this.output = <JSON>this.obj;
        this.plannerModuleService.savePlan(this.output)
    }

    deletePlan(inputCode) {
        this.obj =
            {
                "modulePlannerId": inputCode
            };
        this.output = <JSON>this.obj;
        //this.plannerModuleService.deletePlan(this.output)
    }

    openPlanDialog() {
        this.authService.requireLogIn(() =>
            {
                this.plannerModuleService.getNames().subscribe(response => {
                    this.plannerModuleService.returnNames.next(response.result.modulePlanners);
                });
                this.plannerModuleService.returnNames.subscribe(result => {
                    console.log(result)
                    this.plans = result;
                })
                this.displayLoadForm = true;
            }
        )
    }

    loadPlan(inputCode) {
        this.plannerModuleService.getPlan(inputCode).subscribe(response => {
            this.plannerModuleService.returnPlan.next(response.result);
        });
        this.plannerModules = this.plannerModules.concat(this.selectedModules);
        this.selectedModules = [];
        this.plannerModuleService.returnPlan
            .subscribe(result => {
                console.log(result)
                result.modules.forEach(id => {
                    this.addModule(id)
                });
                this.takenPrerequisites=result.prerequisites;
            });

        localStorage.setItem('takenPrerequisiteStorage', JSON.stringify(this.takenPrerequisites));
        localStorage.setItem('selectedModuleStorage', JSON.stringify(this.selectedModules));
        this.filterSemesters();
    }
}
