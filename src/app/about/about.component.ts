import { Component, OnInit } from '@angular/core';
import { interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);
    /*
    // Understanding Unsubscribe
    const interval1$ = interval(1000);

    const sub = interval1$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 5000);
    */

    /*
    // Understanding Merge Operator
    const interval1$ = interval(1000);

    const interval2$ = interval1$.pipe(map(x => 10 * x));

    const result$ = merge(interval1$, interval2$);

    result$.subscribe(console.log);*/

    /*
    // Defination of streams
    const interval$ = timer(3000, 1000);

    // Not ON unless subscribed
    const sub = interval$.subscribe((val) => {
      console.log(`Stream 1 ${val}`);
    });

    // Unsubscribe
    setTimeout(() => { sub.unsubscribe() }
      , 5000);

    // Success, Error, Complete
    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      (evt) => { console.log(`${evt}`) },
      (err) => { console.log(`${err}`) },
      () => { console.log(`Completed`) }
    );*/

    /* The regular way
    // Multivalue Stream - value emmited with interaction (never complete)
    document.addEventListener('click', evt => {
      console.log(evt);
    });

    // Multivalue Stream - value emmited continious (never complete)
    let counter = 0;
    setInterval(
      () => {
        console.log(counter);
        counter++;
      }, 1000
    );

    // SIngle value Stream - Value emmited only once
    setTimeout(() => {
      console.log(`finished...`);
    }, 3000
    );*/

  }

}
