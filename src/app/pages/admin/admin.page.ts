import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/core/services/admin.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences.service';
import { AddUserModalPage } from './modals/add-user-modal/add-user-modal.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  users: any[];

  constructor(private adminService: AdminService, private usrPreferences: UserPreferencesService, private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
    this.usrPreferences.initAccentColor();
    this.usrPreferences.initTheme();
    this.usrPreferences.addPrefersColorSchemeListener();
    this.loadUsers();
  }

  async showAddUserModal() {
    const modal = await this.modalCtrl.create({
      component: AddUserModalPage,
    });

    modal.onDidDismiss().then((data) => {
      if (data.data !== undefined) this.addUser(data.data);
    });

    return await modal.present();
  }

  showUserDetail(id: number) {
    this.router.navigateByUrl(`app/admin/${id}`);
  }

  loadUsers() {
    this.adminService.loadUsers().subscribe(
      users => this.users = users,
      err => console.error('Failed to load users!'),
    );
  }

  addUser(user: any) {
    // eslint-disable-next-line max-len
    this.adminService.addUser({name: user.name, role: user.role === true ? 'admin' : 'user', password: user.password}).subscribe(_ => this.loadUsers());
  }

  removeUser(id: number) {
    this.adminService.removeUser(id).subscribe(_ => this.loadUsers());
  }
}
