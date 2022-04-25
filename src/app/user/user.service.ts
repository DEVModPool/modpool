import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Response } from "../interaction/response"
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    reviewsObservable: Subject<any> = new Subject<any>();

    protected constructor(private http: HttpClient) {
    }

    getReviews() {
        this.http.get<Response<any>>(environment.baseUrl + environment.profileUrl)
            .subscribe(
                response => {
                    this.reviewsObservable.next(response.result);
                }
            )
    }
}

