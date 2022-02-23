import { Component, OnInit } from '@angular/core';
import { PlannerModuleItem } from './plannermodule';
import { PlannerModuleService } from './plannermoduleservice';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss']
})
export class PlannerPicklistComponent implements OnInit {

    plannermodules: PlannerModuleItem[];
    list2: PlannerModuleItem[];
    constructor(private plannermoduleservice: PlannerModuleService, private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.plannermodules = [];
        this.plannermoduleservice.getProductsSmall().then(
            todules => {
                for (let i = 0; i < todules.length; i++) {
                    this.plannermodules[i] = todules[i];
            }}
            );
        console.log(this.plannermodules);
        this.list2 = [];
        this.primengConfig.ripple = true;


    }

}
