import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

    toTarget(item){

        this.sortTarget();
        this.checkPrequisites(item.items[0]);
        this.selectedmodules.forEach(mod => {
            this.checkPrequisites(mod);
        });
    }

    checkPrequisites(mod){
        let unpicked: string[];
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

    }

    expand(rowid){
        let hidden: HTMLElement;
        hidden=rowid.srcElement.parentElement.parentElement.nextSibling;
        if(hidden.getAttribute("style") == "display: none;"){
            hidden.setAttribute("style", "display: inline;")
            rowid.srcElement.innerHTML="-";
        } else {
            hidden.setAttribute("style", "display: none;");
            rowid.srcElement.innerHTML="+";
        }
    }

    revealPreqs(){

    }

    sortTarget(){
        this.selectedmodules.sort(this.comparesemesters);
    }

}

