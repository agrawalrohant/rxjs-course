import { Component, OnInit } from '@angular/core';
import { noop, Observable, of } from 'rxjs';
import { map, shareReplay, tap, catchError } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Course } from "../model/course";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advanceCourses$: Observable<Course[]>;

    constructor() {
    }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$.pipe(
            tap(() => { console.log(`Http request executed`) }),
            map(res => Object.values(res["payload"])),
            shareReplay(),
            catchError(err => of([
                {
                    id: 0,
                    description: "RxJs In Practice Course",
                    iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
                    courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
                    longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
                    category: 'BEGINNER',
                    lessonsCount: 10
                }
            ]))
        );

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses
                .filter(course => course.category == 'BEGINNER'))
        )
        this.advanceCourses$ = courses$.pipe(
            map(courses => courses
                .filter(course => course.category == 'ADVANCED'))
        )

        /*courses$.subscribe(
            courses => {
                this.beginnerCourses = courses.filter(course => course.category == 'BEGINNER');
                this.advanceCourses = courses.filter(course => course.category == 'ADVANCED');
            },
            noop,
            () => { console.log(`Completed`) }
        )*/

    }

}
