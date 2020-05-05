import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, fromEvent, Observable, noop } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const http$ = Observable.create((observer) => {
      fetch('/api/courses')
        .then(response => {
          return response.json();
        })
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        })
    });

    http$.subscribe(
      courses => console.log(courses),
      noop,
      () => { console.log(`Completed`) }
    )

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
