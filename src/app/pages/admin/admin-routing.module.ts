import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: ':id',
    loadChildren: () => import('../admin/pages/user-detail/user-detail.module').then(m => m.UserDetailPageModule)
  },
  {
    path: 'add-user-modal',
    loadChildren: () => import('./modals/add-user-modal/add-user-modal.module').then( m => m.AddUserModalPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
