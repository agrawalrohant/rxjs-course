import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

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
    );

  }

}
