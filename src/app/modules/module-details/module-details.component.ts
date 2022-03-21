import {Component, OnInit} from '@angular/core';
import {IsActiveMatchOptions} from "@angular/router";

@Component({
    selector: 'app-module-details',
    templateUrl: './module-details.component.html',
    styleUrls: ['module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit {

    data = {
        labels: ['Lab Practicals','Lectures', 'Lab Practicals'],
        datasets: [
            {
                data: [30, 10, 40],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    };
    sections = [
        "Details",
        "Workload",
        "Syllabus",
        "Reviews"
    ]
    constructor() {
    }

    ngOnInit(): void {
    }

    linkActiveOptions: IsActiveMatchOptions = {
        matrixParams: "exact",
        queryParams: "exact",
        paths: "exact",
        fragment: "exact"
    }

}
