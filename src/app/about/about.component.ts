import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, noop, observable, Observable, of, timer, merge, Subject, BehaviorSubject } from 'rxjs';
import { delayWhen, filter, map, take, timeout } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        const subject = new BehaviorSubject(0);

        const series$ = subject.asObservable();

        series$.subscribe(val => console.log("Early sub : " + val));

        subject.next(1);
        subject.next(2);
        subject.next(3);
        // If the Subject is completed, late subscriber will not get anything.
        //subject.complete();

        setTimeout(() => {
            // late subscriber will get the lat value emmited. In this case '3'
            series$.subscribe(val => console.log("late sub : " + val));
            subject.next(4);

        }, 3000);
    }


}






