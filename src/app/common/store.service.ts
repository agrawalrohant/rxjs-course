import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject, timer } from "rxjs";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";
import { tap, map, shareReplay, retryWhen, delayWhen } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class Store {

    private subject = new BehaviorSubject<Course[]>([]);

    coureses$: Observable<Course[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                tap(() => console.log("HTTP request executed")),
                map(res => Object.values(res["payload"]))
            ).subscribe(
                courses => this.subject.next(courses)
            );
    };

    selectBeginnerCourses() {
        return this.selectByCategory('BEGINNER');
    }

    selectAdvancedCourses() {
        return this.selectByCategory('ADVANCED');
    }

    selectByCategory(category: string) {
        return this.coureses$
            .pipe(
                map(
                    courses => courses.
                        filter(course => course.category == category
                        )
                )
            )
    }

}