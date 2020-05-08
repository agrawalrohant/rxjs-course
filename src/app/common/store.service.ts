import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject, timer } from "rxjs";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";
import { tap, map, shareReplay, retryWhen, delayWhen } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";

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

    saveCourse(id: number, value: any): Observable<any> {
        const courses = this.subject.getValue();

        const courseIndex = courses.findIndex(course => course.id == id);

        const newCourses = courses.slice(0);
        newCourses[courseIndex] = {
            ...courses[courseIndex],
            ...value
        };

        this.subject.next(newCourses);

        return fromPromise(fetch(`/api/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
                'content-type': 'application/json'
            }
        }));
    }

}