import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Store } from '../common/store.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private strore: Store) {
    }


    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    ngOnInit() {
        const courses$ = this.strore.coureses$;

        this.beginnerCourses$ = this.strore.selectBeginnerCourses();

        this.advancedCourses$ = this.strore.selectAdvancedCourses();

    }

}
