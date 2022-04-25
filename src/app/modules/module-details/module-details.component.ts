import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions } from "@angular/router";
import { ModuleDetails, StudyHours } from "./module-details.model";
import { RequisiteModule } from "../module-list/module-item/module-item.model";
import { AuthService } from "../../auth/auth.service";
import { GeneralUtil } from "../../util/general.util";
import { ModulesService } from "../modules.service";
import { ReviewsService } from "../../reviews/reviews.service";
import { ModuleReviewsService } from "../module-reviews/module-reviews.service";
import { SubscriptionHandler } from "../../interaction/subscription-handler";
import { Review } from "../../interaction/reviews/review.model";
import { PlannerModuleService } from 'src/app/planner/planner-picklist.service';

@Component({
    selector: 'app-module-details',
    templateUrl: './module-details.component.html',
    styleUrls: ['module-details.component.scss']
})
export class ModuleDetailsComponent extends SubscriptionHandler implements OnInit {
    studyHoursPieData: StudyHoursPieData;

    moduleDetails: ModuleDetails;
    reviews: Review[];

    icon = "pi pi-calendar-plus"
    buttontext = "Add to planner"

    semesters = {
        1: 'Semester 1',
        2: 'Semester 2',
        3: 'Full year'
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private reviewsService: ModuleReviewsService,
        private plannerModuleService: PlannerModuleService) {
        super();
    }

    ngOnInit(): void {
        this.storeSubscription(
            this.activatedRoute.data.subscribe(
                response => {
                    this.reviews = response.moduleData.reviews;
                    let module = response.moduleData.module;
                    module.department = {id: module.departmentId, name: module.departmentName};
                    module.coordinator = {id: module.coordinatorId, fullName: module.coordinatorFullName};
                    module.prerequisiteModules = module.prerequisiteModuleProjections;
                    module.prerequisiteForModules = module.prerequisiteForModuleProjections;
                    module.studyHours = {
                        fieldworkPlacement: module.studyHoursFieldworkPlacement,
                        labPracticals: module.studyHoursLabPracticals,
                        lectures: module.studyHoursLectures,
                        other: module.studyHoursOther,
                        privateStudy: module.studyHoursPrivateStudy,
                        seminars: module.studyHoursSeminars,
                        tutorials: module.studyHoursTutorials,
                        totalStudyHours: {
                            totalTeaching: module.studyHoursTotalTeaching,
                            privateStudy: module.studyHoursTutorials,
                            totalStudy: module.studyHoursTotal,
                        },
                    }
                    module.semester = this.semesters[module.semester];
                    this.moduleDetails = module;
                    this.processStudyHoursData(this.moduleDetails.studyHours);
                    let selectedModules = JSON.parse(localStorage.getItem('selectedModuleStorage'))
                    if (selectedModules) {
                        if (selectedModules.map(x => x.id).includes(this.moduleDetails.id)) {
                            this.icon = 'pi pi-check'
                            this.buttontext = "Added to planner"
                        }
                    }
                }
            )
        );

    }

    onLeaveReview() {
        this.reviewsService.displayNewReviewModal(this.moduleDetails.code);
    }

    private processStudyHoursData(studyHours: StudyHours) {
        const newStudyHoursPieData: StudyHoursPieData = new StudyHoursPieData([], []);
        newStudyHoursPieData.datasets.push(new PieChartDataset([], [], []));
        for (const workloadType in studyHours) {
            if (studyHours[workloadType] != null && workloadType != "totalStudyHours") {
                newStudyHoursPieData.labels.push(GeneralUtil.camelToString(workloadType));
                newStudyHoursPieData.datasets[0].data.push(studyHours[workloadType]);
                newStudyHoursPieData.datasets[0].backgroundColor.push(GeneralUtil.generatePurple());
                newStudyHoursPieData.datasets[0].hoverBackgroundColor.push(GeneralUtil.generatePink());
            }
        }
        this.studyHoursPieData = newStudyHoursPieData;
    }
    addToPlanner(){
        let moduleId = this.moduleDetails.id
        console.log(moduleId)
        let selectedModules = JSON.parse(localStorage.getItem('selectedModuleStorage'))
        this.plannerModuleService.getModule(moduleId)
            .subscribe(response => {
                this.plannerModuleService.requestedModule.next(response.result);
            });
        this.plannerModuleService.requestedModule
            .subscribe(result => {
                if (result.id == moduleId){
                    if (selectedModules == null) {
                        selectedModules = [moduleId]
                        this.setStyling(true)
                    } else if (!selectedModules.map(x => x.id).includes(moduleId)) {
                        selectedModules.push(result)
                        this.setStyling(true)
                    } else {
                        let n = []
                        selectedModules.forEach(x => {
                            if (x.id != moduleId) {
                                n.push(x)
                            }
                        });
                        selectedModules = n
                        this.setStyling(false)
                    }
                    localStorage.setItem('selectedModuleStorage', JSON.stringify(selectedModules));
                }
            })

    }

    setStyling(add) {
        if (add) {
            this.icon = 'pi pi-check'
            this.buttontext = "Added to planner"
        } else {
            this.icon = "pi pi-calendar-plus"
            this.buttontext = "Add to planner"
        }
    }

    pageSections = [
        "details",
        "workload",
        "syllabus",
        "reviews"
    ]


    linkActiveOptions: IsActiveMatchOptions = {
        matrixParams: "exact",
        queryParams: "exact",
        paths: "exact",
        fragment: "exact"
    }

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
    ) {
    }
}

