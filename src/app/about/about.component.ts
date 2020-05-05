import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const interval$ = interval(1000);
    interval$.subscribe((val) => {
      console.log(`Stream 1 ${val}`);
    });
    interval$.subscribe((val) => {
      console.log(`Stream 2 ${val}`);
    });





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
