import { Component, OnInit } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, finalize, map, shareReplay, tap, retryWhen, delayWhen } from 'rxjs/operators';
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
            catchError(err => {
                console.log(`Error Ouccered : ${err}`);
                return throwError(err);
            }),
            finalize(() => {
                console.log(`Finalize executed...`);
            }
            ),
            tap(() => { console.log(`Http request executed`) }),
            map(res => Object.values(res["payload"])),
            shareReplay(),
            retryWhen(error => error.pipe(
                delayWhen(() => timer(2000))
            ))
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
