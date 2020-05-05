import { Component, OnInit } from '@angular/core';
import { interval, Observable, of, timer, noop } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Course } from "../model/course";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses: Course[];
    advanceCourses: Course[];

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const courses$ = http$.pipe(
            map(res => Object.values(res["payload"]))
        );

        courses$.subscribe(
            courses => {
                this.beginnerCourses = courses.filter(course => course.category == 'BEGINNER');
                this.advanceCourses = courses.filter(course => course.category == 'ADVANCED');
            },
            noop,
            () => { console.log(`Completed`) }
        )

    }

}
