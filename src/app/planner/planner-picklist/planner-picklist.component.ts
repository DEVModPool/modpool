import { Component, OnInit } from '@angular/core';
import { PlannerModuleItem } from './plannermodule';
import { PlannerModuleService } from './plannermoduleservice';
import { PrimeNGConfig } from 'primeng/api';
import { style } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-planner-picklist',
  templateUrl: './planner-picklist.component.html',
  styleUrls: ['./planner-picklist.component.scss']
})


export class PlannerPicklistComponent implements OnInit {

    plannermodules: PlannerModuleItem[];
    selectedmodules: PlannerModuleItem[];
    constructor(private plannermoduleservice: PlannerModuleService, private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.plannermodules = [];
        this.plannermoduleservice.getProductsSmall().subscribe(
            result => this.plannermodules = result
        );
        this.selectedmodules = [];
        this.primengConfig.ripple = true;

    }



    comparesemesters(a, b) {
        if (a.semester<b.semester) {
          return -1;
        }
        if (a.semester>b.semester) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }

    toTarget(){
        let unpicked: string[];
        this.sortTarget();
        this.selectedmodules.forEach(mod => {
            unpicked=[];
            mod.prerequisites.forEach(preq => {
                let found: boolean = false;
                for(let mod2 of this.selectedmodules) {
                    if(mod2.code==preq){
                        found=true;
                        break;
                    }
                }
                if(!found){
                    unpicked[unpicked.length] = preq;
                }
            })
            if(unpicked.length!=0){
                let inntertext: string = "Prequisites: " + unpicked;
                console.log(document.getElementById(mod.code).getElementsByClassName("prequisiterow")[0]);
                document.getElementById(mod.code).getElementsByClassName("preqlist")[0].innerHTML=inntertext;
            }
        });
    }
    revealPreqs(){

    }

    sortTarget(){
        this.selectedmodules.sort(this.comparesemesters);
    }

    toggleprequisites(item){
        if(document.getElementById(item.items[0].code).getElementsByClassName("hiddenrow")[0].getAttribute("style") == "display: none;"){
            document.getElementById(item.items[0].code).getElementsByClassName("hiddenrow")[0].setAttribute("style", "display: inline;");
        } else {
            document.getElementById(item.items[0].code).getElementsByClassName("hiddenrow")[0].setAttribute("style", "display: none;");
        }

    }

}
