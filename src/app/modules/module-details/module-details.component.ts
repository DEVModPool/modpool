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

@Component({
    selector: 'app-module-details',
    templateUrl: './module-details.component.html',
    styleUrls: ['module-details.component.scss']
})
export class ModuleDetailsComponent extends SubscriptionHandler implements OnInit {
    studyHoursPieData: StudyHoursPieData;

    moduleDetails: ModuleDetails;
    reviews: Review[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private reviewsService: ModuleReviewsService) {
        super();
    }

    ngOnInit(): void {


        this.storeSubscription(
            this.activatedRoute.data.subscribe(
                response => {
                    console.log(response);

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

                    module.assessments = [
                        {name: "Written Exam", weight: 70},
                        {name: "Final Exam", weight: 30},
                    ]
                    this.moduleDetails = module;

                    this.processStudyHoursData(this.moduleDetails.studyHours);
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

