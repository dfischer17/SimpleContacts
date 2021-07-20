import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  students: any[];

  constructor() { }

  ngOnInit() {
    fetch('./assets/data/students.json').then(res => res.json())
      .then(json => {
        this.students = json;
      });
  }
}
