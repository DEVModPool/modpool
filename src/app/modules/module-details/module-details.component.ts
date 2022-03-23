import {Component, OnInit} from '@angular/core';
import {IsActiveMatchOptions} from "@angular/router";
import {ModuleDetails, StudyHours} from "../../interaction/modules/module-details.model";
import {RequisiteModule} from "../../interaction/modules/module.model";
import {ViewportScroller} from "@angular/common";
import {AuthService} from "../../auth/auth.service";

@Component({
    selector: 'app-module-details',
    templateUrl: './module-details.component.html',
    styleUrls: ['module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit {

    showModal() {
        this.authService.loginModalDisplayed.next(true);
    }

    displayModal = false;
    studyHoursPieData: StudyHoursPieData;
    randomColor = require('randomcolor');

    private generatePurple() {
        return this.randomColor({hue: 'purple'});
    }

    private generatePink() {
        return this.randomColor({hue: 'pink'});
    }

    private camelToString(text: string) {
        const result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    private processStudyHoursData(studyHours: StudyHours) {
        const newStudyHoursPieData: StudyHoursPieData = new StudyHoursPieData([], []);
        newStudyHoursPieData.datasets.push(new PieChartDataset([],[],[]));

        for (const workloadType in studyHours) {
            if (studyHours[workloadType] && workloadType != "totalStudyHours") {
                newStudyHoursPieData.labels.push(this.camelToString(workloadType));
                newStudyHoursPieData.datasets[0].data.push(studyHours[workloadType]);
                newStudyHoursPieData.datasets[0].backgroundColor.push(this.generatePurple());
                newStudyHoursPieData.datasets[0].hoverBackgroundColor.push(this.generatePink());
            }
        }
        this.studyHoursPieData = newStudyHoursPieData;
    }

    pageSections = [
        "details",
        "workload",
        "syllabus",
        "reviews"
    ]
    constructor(private authService: AuthService) {
    }


    ngOnInit(): void {
        this.authService.loginModalDisplayed.subscribe(
            displayed => {
                this.displayModal = displayed;
            }
        )
        this.processStudyHoursData(this.moduleDetails.studyHours);
    }

    linkActiveOptions: IsActiveMatchOptions = {
        matrixParams: "exact",
        queryParams: "exact",
        paths: "exact",
        fragment: "exact"
    }

    // TODO-TD: Fetch this data using a resolver.
    moduleDetails: ModuleDetails = new ModuleDetails(
        "123",
        "Database Development",
        "COMP 207",
        {id: "1", name: "Computer Science"},
        "Semester 1",
        {id: "1233", name: "Rasmus Ibsen Jensen"},
        15,
        "To introduce students to\n" +
        "- the problems arising from databases, including concurrency in databases, information security considerations and how they are solved;\n" +
        "- the problems arising from the integration of heterogeneous sources of information and the use of semi-structured data;\n" +
        "- non-relational databases and the economic factors involved in their selection;\n" +
        "- techniques for analysing large amounts of data, the security issues and commercial factors involved with them.",
        "(LO1) Demonstrate an understanding of basic and advanced SQL topics;\n" +
        "(LO2) At the end of this module the student will be able to identify and apply the principles underpinning transaction management within DBMS and the main security issues involved in securing transaction;\n" +
        "(LO3) Illustrate the issues related to Web technologies as a semi-structured data representation formalism;\n" +
        "(LO4) Interpret the main concepts and security aspects in data warehousing, and the concepts of data mining and commercial considerations involved in adopting the paradigm.\n" +
        "(S1) Problem Solving - Numeracy and computational skills\n" +
        "(S2) Problem solving – Analysing facts and situations and applying creative thinking to develop appropriate solutions.",
        {
            lectures: 30,
            seminars: null,
            tutorials: 5,
            labPracticals: 5,
            fieldwork: null,
            other: null,
            totalStudyHours: {
                totalTeaching: 40,
                privateStudy: 110,
                totalStudy: 150
            }
        },
        [
            {
                type: "Written Exam",
                weight: 70
            },
            {
                type: "Coursework",
                weight: 15

            },
            {
                type: "Coursework",
                weight: 15
            }
        ],
        "Basic and advanced SQL topics (5 lectures): SELECT, INSERT, DELETE, indexes and materialised view;\n" +
        "Transactions/concurrency in databases (9 lectures): Transaction management, recoverability and security;\n" +
        "Query optimisation (5 lectures): Relational Algebra Transaction management;\n" +
        "Distributed databases (3 lectures): Models and security issues;\n" +
        "Web technologies and DBMS (5 lectures): Semistructured databases and connectivity;\n" +
        "Data warehousing and data mining (3 lectures): Platforms, security and commercial aspects.",
        49,
        4.3,
        [
            new RequisiteModule("123456", "COMP122 - Object-Oriented Programming")
        ],
        []
    )
}

export class StudyHoursPieData {
    constructor(
        public labels?: string[],
        public datasets?: PieChartDataset[],
    ) {
    }
}

class PieChartDataset {
    constructor(
        public data?: number[],
        public backgroundColor?: string[],
        public hoverBackgroundColor?: string[]
    ) {}
}

