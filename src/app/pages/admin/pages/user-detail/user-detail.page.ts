import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  user: any;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService, private usrPreferences: UserPreferencesService) { }

  ngOnInit() {
    this.usrPreferences.initAccentColor();
    this.usrPreferences.initTheme();
    this.usrPreferences.addPrefersColorSchemeListener();

    // Load detail-page for selected user in admin-page
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.loadSingleUser(Number(id)).subscribe(x => {
      this.user = x;
      console.log(x);
    });
  }
}
