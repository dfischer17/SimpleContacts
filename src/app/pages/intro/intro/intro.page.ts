import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { INTRO_KEY } from 'src/app/core/guards/intro.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async closeIntro() {
    await Storage.set({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('login', { replaceUrl: true });
  }
}
