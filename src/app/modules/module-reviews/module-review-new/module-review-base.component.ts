import { Injectable, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { ReviewNewComponent } from "../../../reviews/review-new.component";
import { ModuleReviewsService } from "../module-reviews.service";

@Injectable()
export abstract class ModuleReviewBaseComponent extends ReviewNewComponent implements OnInit {

    academicYears: any[];
    moduleCode: string;
    patchData: any;

    protected constructor(
        reviewsService: ModuleReviewsService) {
        super(reviewsService);
        this.initFormGroup({
            quality: new FormControl(Validators.required),
            difficulty: new FormControl(Validators.required),
            moduleAcademicYear: new FormControl(),
            content: new FormControl('')
        });
    }

    ngOnInit() {
        this.reviewsService.academicYearObservable.subscribe(
            response => {
                this.academicYears = response.result.academicYears;
                this.moduleCode = response.result.moduleCode;
                if (response.result.patchData) {
                    this.reviewForm.patchValue(response.result.patchData);
                }
            }
        );
    }
}
